const handler = require("express-async-handler");
const client = require('../../config/db')

const { validationTeacher } = require('../../validation/validationFunction')



const getAllTeachersController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.teacher`
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

const getTeacherByIDController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.teacher
        WHERE "teacher_id"=${req.params.id}`
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

const updateTeacherController = handler(async (req, res) => {
    const reqB = req.body;
    const { error } = validationTeacher(reqB);
    if (error) {
        res.json({ message: error.details[0].message })
    } else {
        await client.query(`UPDATE public.teacher
	SET  "full_name"='${reqB.full_name}', "address"='${reqB.address}', "mobile_number"='${reqB.mobile_number}', 
    "gender"='${reqB.gender}', "data_of_birth"='${reqB.data_of_birth}', "major"='${reqB.major}', 
    "password"='${reqB.password}', "teacher_image"='${reqB.teacher_image},"email"='${reqB.email}',"is_admin"='${reqB.is_admin}'
	WHERE "teacher_id" =${req.params.id};`,
            (error, result) => {
                if (!error) {
                    res.status(201);
                    res.json({ message: "update teacher successfully" });
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

const deleteTeacherController = handler(async (req, res) => {
    await client.query(`DELETE FROM public.teacher
	WHERE "teacher_id"=${req.params.id}`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: `delete teacher successfully` });
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


module.exports = { deleteTeacherController, getAllTeachersController, getTeacherByIDController, updateTeacherController }