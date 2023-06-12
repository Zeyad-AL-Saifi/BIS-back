const handler = require("express-async-handler");
const client = require('../../config/db');
const { validationStudent } = require('../../validation/validationFunction');



const getAllStudentsController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.students`
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

const getStudentByIDController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.students
        WHERE "id_student"=${req.params.id}`
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


const updateStudentController = handler(async (req, res) => {
    const reqB = req.body;
    const { error } = validationStudent(reqB);
    if (error) {
        res.json({ message: error.details[0].message })
    } else {
        await client.query(`UPDATE public.students
	SET  "full_name"='${reqB.full_name}', "address"='${reqB.address}', "mobile_number"='${reqB.mobile_number}', 
    "gender"='${reqB.gender}', "data_of_birth"='${reqB.data_of_birth}', "class_number"='${reqB.class_number}', 
    "password"='${reqB.password}', "student_image"='${reqB.student_image},"email"='${reqB.email}',"is_admin"='${reqB.is_admin}''
	WHERE "id_student" =${req.params.id};`,
            (error, result) => {
                if (!error) {
                    res.status(201);
                    res.json({ message: "update student successfully" });
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

})

const deleteStudentController = handler(async (req, res) => {
    await client.query(`DELETE FROM public.students
	WHERE "id_student"=${req.params.id}`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: `delete student successfully` });
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



module.exports = { deleteStudentController, getAllStudentsController, getStudentByIDController, updateStudentController }