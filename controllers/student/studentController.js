const handler = require("express-async-handler");
const client = require('../../config/db');

const getAllStudentsController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.students`
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

const getStudentByIDController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.students
        WHERE "id_student"=${req.params.id}`
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


const updateStudentController = handler(async (req, res) => {
    const reqB = req.body;
    await client.query(`UPDATE public.students
                SET "full_name"='${reqB.full_name}', 
                "address"='${reqB.address}',
                "mobile_number"='${reqB.mobile_number}', 
                "date_of_birth"='${reqB.date_of_birth}',
                "email"='${reqB.email}',
                "class_number"='${reqB.class_number}'
                WHERE "id_student"=${req.params.id}
                `,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: "update student successfully" });
            } else {
                res.status(401);
                res.send({ message: error });
            }
            client.end;
        }

    )









})

const deleteStudentController = handler(async (req, res) => {
    await client.query(`DELETE FROM public.students
	WHERE "id_student"=${req.params.id}`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: `delete student successfully` });
            } else {
                res.status(400);
                res.send({ message: error });
            }
            client.end;
        }

    )

})



module.exports = { deleteStudentController, getAllStudentsController, getStudentByIDController, updateStudentController }