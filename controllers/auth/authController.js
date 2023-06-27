
const handler = require("express-async-handler");
const client = require('../../config/db')
const bcrypt = require('bcryptjs')
const { validationTeacher, validationStudent } = require('../../validation/validationFunction');
const { genarateToken } = require("../../middlewares/token");

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
            res.send({ message: "password not correct" });
        }

    } else { res.status(400).json({ message:"email not exist" }) }


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
            res.send({ message: "password not correct" })
        }

    } else (res.status(404).send({ message: "email not exists" }))
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
            if (error) {
                return res.status(400).json({ message: error });
            } else if (result.rows.length > 0) {
                return res.status(400).json({ message: "This email exists" })
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
                            res.json({ message: "Add new student successfully" });
                        } else {
                            res.status(400);
                            res.send({ message: error });

                        }
                        client.end;
                    }
                )

            }
        }
    )
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
                return res.status(400).json({ message: error });
            } else if (result.rows.length > 0) {
                return res.status(400).json({ message: "This email exists" })
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
                            res.json({ message: "Add new teacher successfully" });

                        } else {
                            res.status(400);
                            res.send({ message: error });

                        }
                        client.end;
                    }

                )

            }
        }
    )












})

module.exports = { addNewStudentController, addNewTeacherController, loginStudentController, loginTeacherController }