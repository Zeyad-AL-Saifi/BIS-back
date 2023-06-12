const handler = require("express-async-handler");
const client = require('../../config/db')

const { validationNoteTeacher } = require('../../validation/validationFunction')



const getAllTeachernoteController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.teacher_notes`
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

const getTeachernoteByIDController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.teacher_notes
        WHERE "teacher_notes_id"=${req.params.id}`
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


const addNewTeachernoteController = handler(async (req, res) => {
    const reqB = req.body; const { error } = validationNoteTeacher(reqB);
    if (error) {
        res.json({ message: error.details[0].message })
    } else {
        await client.query(`INSERT INTO public.teacher_notes(
        "teacher_id_from", "teacher_name_from", "student_name_to", "note_status_code", "note")
        VALUES('${reqB.teacher_id_from}', '${reqB.teacher_name_from}', 
            '${reqB.student_name_to}', '${reqB.note_status_code}', 
            '${reqB.note}')`,
            (error, result) => {
                if (!error) {
                    res.status(201);
                    res.json({ message: "add  teacher notes successfully" });
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


const updateTeachernoteController = handler(async (req, res) => {
    const reqB = req.body;
    const { error } = validationNoteTeacher(reqB);
    if (error) {
        res.json({ message: error.details[0].message })
    } else {
        await client.query(`UPDATE public.teacher_notes
	SET  "teacher_id_from"='${reqB.teacher_id_from}',
     "teacher_name_from"='${reqB.teacher_name_from}',
      "student_name_to"='${reqB.student_name_to}', 
    "note_status_code"='${reqB.note_status_code}',
     "note"='${reqB.note}'
	WHERE "teacher_notes_id" =${req.params.id};`,
            (error, result) => {
                if (!error) {
                    res.status(201);
                    res.json({ message: "update teacher notes successfully" });
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

const deleteTeachernoteController = handler(async (req, res) => {
    await client.query(`DELETE FROM public.teacher_notes
	WHERE "teacher_notes_id"=${req.params.id}`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: `delete teacher notes successfully` });
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



module.exports = { getAllTeachernoteController, getTeachernoteByIDController, addNewTeachernoteController, updateTeachernoteController, deleteTeachernoteController }