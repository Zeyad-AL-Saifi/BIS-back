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
                return res.json(error)
            } else if (result.rowCount > 0) {
                res.json({ message: "This email is being used by someone" })
            } else {
                client.query(`UPDATE public.students
                SET "full_name"='${reqB.full_name}', 
                "address"='${reqB.address}',
                "mobile_number"='${reqB.mobile_number}', 
                "date_of_birth"='${reqB.date_of_birth}',
                "email"='${reqB.email}',
                "class_number"='${reqB.class_number}',
                "student_image"='${reqB.student_image}'
                WHERE "id_student"=${req.params.id}
                `,
                    (error, result) => {
                        if (!error) {
                            res.status(201);
                            res.json({ message: "update student successfully" });
                            res.end();
                        } else {
                            res.status(401);
                            res.send(error);
                            res.end();
                        }
                        client.end;
                    }

                )
            }
        })







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