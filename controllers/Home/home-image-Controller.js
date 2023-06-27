const handler = require("express-async-handler");
const client = require('../../config/db')
const fs = require('fs');
const path = require("path");
const { cloudinaryUploadImage } = require("../../utils/cloudinery");

const getAllHomeImagesController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.image_home_content`
        ,
        (error, result) => {
            if (!error) {
                res.status(200);
                res.json(result.rows);
            } else {
                res.status(404);
                res.json({ message: error });
            }
            client.end;
        }
    )

})

const getHomeImagesByIDController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.image_home_content
        WHERE "image_id"=${req.params.id}`
        ,
        (error, result) => {
            if (!error) {
                res.status(200);
                res.json(result.rows);
            } else {
                res.status(404);
                res.json({ message: error });
            }
            client.end;
        }
    )

})


const addNewHomeImagesController = handler(async (req, res) => {
    const reqB = req.body;

    //valodation
    if (!req.file) {
        return res.status(400).json({ message: "no file provided" })
    };
    //get the path to the image
    const imagePath = path.join(__dirname, `../../images/${req.file.filename}`);

    //upload to cloudinary
    const result = await cloudinaryUploadImage(imagePath);


    const { secure_url, public_id } = result;
    const data = JSON.stringify({ secure_url, public_id })
    await client.query(`INSERT INTO public.image_home_content("image_name","image_data")
        VALUES('image.jpg','${data}')`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: "add new home image successfully" });
            } else {
                res.status(400);
                res.send({ message: error });
            }
            client.end;
        }

    )



    //reomve image from system 
    fs.unlinkSync(imagePath);

})


const deleteHomeImagesController = handler(async (req, res) => {
    await client.query(`DELETE FROM public.image_home_content
	WHERE "image_id"=${req.params.id}`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: `delete image successfully` });
            } else {
                res.status(400);
                res.send({ message: error });
            }
            client.end;
        }

    )

})



module.exports = { getAllHomeImagesController, getHomeImagesByIDController, addNewHomeImagesController, deleteHomeImagesController }