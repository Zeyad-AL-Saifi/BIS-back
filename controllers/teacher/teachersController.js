const handler = require("express-async-handler");
const client = require('../../config/db')
const getAllTeachersController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.teacher`
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

const getTeacherByIDController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.teacher
        WHERE "teacher_id"=${req.params.id}`
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

const updateTeacherController = handler(async (req, res) => {
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
                return res.status(400).json(error)
            } else if (result.rowCount > 0) {
                res.status(400).json({ message: "This email is being used by someone" })
            } else {
                client.query(`UPDATE public.teacher
            SET  "full_name"='${reqB.full_name}', 
            "address"='${reqB.address}', 
            "mobile_number"='${reqB.mobile_number}', 
            "major"='${reqB.major}', 
            "email"='${reqB.email}',
            "is_admin"='${reqB.is_admin}', 
            "teacher_image"='${reqB.teacher_image}'
             WHERE "teacher_id"=${req.params.id}
             `,
                    (error, result) => {
                        if (!error) {
                            res.status(201);
                            res.json({ message: "update teacher successfully" });
                        } else {
                            res.status(400);
                            res.send({ message: error });
                        }
                        client.end;
                    }

                )
            }


        })


}
)

const deleteTeacherController = handler(async (req, res) => {
    await client.query(`DELETE FROM public.teacher
	WHERE "teacher_id"=${req.params.id}`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: `delete teacher successfully` });
            } else {
                res.status(400);
                res.send({ message: error });
            }
            client.end;
        }

    )

})


module.exports = { deleteTeacherController, getAllTeachersController, getTeacherByIDController, updateTeacherController }