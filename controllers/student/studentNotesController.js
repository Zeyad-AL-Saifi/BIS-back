const handler = require("express-async-handler");
const client = require('../../config/db')


const getAllStudentnoteController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.student_notes`
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

const getStudentnoteByIDController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.student_notes 
        WHERE "teacher_name_to" = '${req.params.name}'`
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


const addNewStudentnoteController = handler(async (req, res) => {
    const reqB = req.body;

    await client.query(`INSERT INTO public.student_notes(
        "student_id_from","student_name_from","teacher_name_to","note_status_code","note","time")
        VALUES('${reqB.student_id_from}','${reqB.student_name_from}', 
            '${reqB.teacher_name_to}','${reqB.note_status_code}', 
            '${reqB.note}','${reqB.time}')`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: "Add  student notes successfully" });
            } else {
                res.status(400);
                res.send({ message: error });
            }
            client.end;
        }

    )

})


const updateStudentnoteController = handler(async (req, res) => {
    const reqB = req.body;
    await client.query(`UPDATE public.student_notes
	SET  note_status_code=1
	WHERE note_id = ${req.params.id};`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: "update student notes successfully" });
            } else {
                res.status(400);
                res.send({ message: error });
            }
            client.end;
        }

    )

})

const deleteStudentnoteController = handler(async (req, res) => {
    await client.query(`DELETE FROM public.student_notes
	WHERE "note_id"=${req.params.id}`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: `delete student notes successfully` });
            } else {
                res.status(400);
                res.send({ message: error });
            }
            client.end;
        }

    )

})



module.exports = { getAllStudentnoteController, getStudentnoteByIDController, addNewStudentnoteController, updateStudentnoteController, deleteStudentnoteController }