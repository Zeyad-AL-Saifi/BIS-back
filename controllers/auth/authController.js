
const handler = require("express-async-handler");
const client = require('../../config/db')
const bcrypt = require('bcryptjs')
const { validationTeacher, validationStudent } = require('../../validation/validationFunction');
const { genarateToken } = require("../../middlewares/token");
const { cloudinaryUploadImage } = require("../../utils/cloudinery");

const loginStudentController = handler(async (req, res) => {


    const user = await client.query(`SELECT *
	FROM public.students
	where "email"='${req.body.email}'`)
    if (user.rowCount != 0) {
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.rows[0].password
        );
        if (isPasswordMatch) {

            const token = await genarateToken(user.rows[0]);
            const { password, ...other } = user.rows[0];
            res.status(200).send({ ...other, token, message: "Successfully logining ......" })
        }
        else {
            res.status(400);
            res.send({ error: "password not correct" });
        }

    } else (res.status(404).send({ error: "email not exists" }))


})

const loginTeacherController = handler(async (req, res) => {


    const user = await client.query(`SELECT *
	FROM public.teacher
	where "email"='${req.body.email}'`)
    if (user.rowCount != 0) {
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.rows[0].password
        );
        if (isPasswordMatch) {
            const token = await genarateToken(user.rows[0]);
            const { password, ...other } = user.rows[0];
            res.status(200).send({ ...other, token, message: "Successfully logining ......" })
        }
        else {
            res.status(400);
            res.send({ error: "password not correct" })
        }

    } else (res.status(404).send({ error: "email not exists" }))
})


const addNewStudentController = handler(async (req, res) => {
    const reqB = req.body;
    //validation
    const { error } = validationStudent(reqB);
    if (error) {
        res.status(400);
        return res.json({ message: error.details[0].message })

    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    reqB.password = await bcrypt.hash(reqB.password, salt);


    //valodation image 
    // if (!req.file) {
    //     return res.status(400).json({ message: "no file provided" })
    // };
    //get the path to the image
    // const imagePath = path.join(__dirname, `../../images/${req.file.filename}`);

    // //upload to cloudinary
    // const result = await cloudinaryUploadImage(imagePath);


    //get the user 
    await client.query(
        `
    SELECT email
    FROM students WHERE email = '${req.body.email}'
    UNION ALL
    SELECT email
    FROM teacher WHERE email = '${req.body.email}'`
        ,
        (error, result) => {
            //delete image if exsit
            // if (result.student_image.publicId !== null) {
            //     cloudinaryRemoveImage(user.image.publicId)
            // }
            // const { secure_url, public_id } = result;
            // const data = JSON.stringify({ secure_url, public_id })
            if (error) {
                res.json(error);
            } else if (result.rows.length > 0) {
                res.json({ message: "This email exists" })
            } else {
                client.query(`INSERT INTO public.students(
                    "full_name", "address", "mobile_number", "gender", "date_of_birth", "class_number", "password", "student_image","email")
                    VALUES('${reqB.full_name}', '${reqB.address}', 
                        '${reqB.mobile_number}', '${reqB.gender}', 
                        '${reqB.date_of_birth}', '${reqB.class_number}',
                         '${reqB.password}', '${reqB.student_image}','${reqB.email}')`,
                    (error, result) => {
                        if (!error) {
                            res.status(201);
                            res.json({ message: "add new student successfully" });
                        } else {
                            res.status(400);
                            res.send(error);
                            res.end();
                        }
                        client.end;
                    }
                )

            }
        }
    )
    //reomve image from system 
    // fs.unlinkSync(imagePath);
})

const addNewTeacherController = handler(async (req, res) => {
    const reqB = req.body;
    const { error } = validationTeacher(reqB);
    if (error) {
        return res.json({ message: error.details[0].message })
    }


    //hash password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const o = {
        data: "erwerwwr"
    }
    //auth and signup
    await client.query(
        `SELECT email
    FROM students WHERE email = '${req.body.email}'
    UNION ALL
    SELECT email
    FROM teacher WHERE email = '${req.body.email}'`

        ,
        (error, result) => {
            if (error) {
                res.json(error);
            } else if (result.rows.length > 0) {
                res.json({ message: "This email exists" })
            } else {
                client.query(`INSERT INTO public.teacher(
                    "full_name", "address", "mobile_number","major", "gender","password","teacher_image","email","is_admin")
                    VALUES('${reqB.full_name}', 
                           '${reqB.address}', 
                           '${reqB.mobile_number}',
                           '${reqB.major}', 
                           '${reqB.gender}', 
                           '${reqB.password}', 
                           '${reqB.teacher_image}',
                           '${reqB.email}',
                           '${reqB.is_admin}'
                           )`,
                    (error, result) => {
                        if (!error) {
                            res.status(201);
                            res.json({ message: "add new teacher successfully" });
                            res.end();
                        } else {
                            res.status(400);
                            res.send(error);
                            res.end();
                        }
                        client.end;
                    }

                )

            }
        }
    )












})



module.exports = { addNewStudentController, addNewTeacherController, loginStudentController, loginTeacherController }