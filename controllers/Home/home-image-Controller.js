const handler = require("express-async-handler");
const client = require('../../config/db')
const fs = require('fs');
const path = require("path");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../../utils/cloudinery");
const { json } = require("express");

const getAllHomeImagesController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.image_home_content`
        ,
        (error, result) => {
            if (!error) {
                res.status(200);
                res.json(result.rows);
                res.end();
            } else {
                res.status(404);
                res.json(error);
                res.end();
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
                res.end();
            } else {
                res.status(404);
                res.json(error);
                res.end();
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

    //get the user from db
    // const user =select

    //delete image if exsit
    // if (user.image_data.publicId !== null) {
    //     await cloudinaryRemoveImage(user.image.publicId)
    // }
    const { secure_url, public_id } = result;
    const data = JSON.stringify({ secure_url, public_id })
    await client.query(`INSERT INTO public.image_home_content("image_name","image_data")
        VALUES('image.jpg','${data}')`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: "add new home image successfully" });
                res.end();
            } else {
                res.status(400);
                res.send(error);
                res.end();
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
                res.end();
            } else {
                res.status(400);
                res.send(error);
                res.end();
            }
            client.end;
        }

    )

})



module.exports = { getAllHomeImagesController, getHomeImagesByIDController, addNewHomeImagesController, deleteHomeImagesController }