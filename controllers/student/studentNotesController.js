const handler = require("express-async-handler");
const client = require('../../config/db')
const { validationNoteSt } = require('..//..//validation/validationFunction');




const getAllStudentnoteController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.student_notes`
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

const getStudentnoteByIDController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.student_notes
        WHERE "stud_note_id"=${req.params.id}`
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


const addNewStudentnoteController = handler(async (req, res) => {
    const reqB = req.body;
    const { error } = validationNoteSt(reqB);
    if (error) {
        res.json({ message: error.details[0].message })
    } else {
        await client.query(`INSERT INTO public.student_notes(
        "student_id_from", "student_name_from", "teacher_name_to", "note_status_code", "note")
        VALUES('${reqB.student_id_from}', '${reqB.student_name_from}', 
            '${reqB.teacher_name_to}', '${reqB.note_status_code}', 
            '${reqB.note}')`,
            (error, result) => {
                if (!error) {
                    res.status(201);
                    res.json({ message: "add  student notes successfully" });
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


const updateStudentnoteController = handler(async (req, res) => {
    const reqB = req.body;
    const { error } = validationNoteSt(reqB);
    if (error) {
        res.json({ message: error.details[0].message })
    } else {
        await client.query(`UPDATE public.student_notes
	SET  "student_id_from"='${reqB.student_id_from}',
     "student_name_from"='${reqB.student_name_from}',
      "teacher_name_to"='${reqB.teacher_name_to}', 
    "note_status_code"='${reqB.note_status_code}',
     "note"='${reqB.note}'
	WHERE "stud_note_id" =${req.params.id};`,
            (error, result) => {
                if (!error) {
                    res.status(201);
                    res.json({ message: "update student notes successfully" });
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

const deleteStudentnoteController = handler(async (req, res) => {
    await client.query(`DELETE FROM public.student_notes
	WHERE "stud_note_id"=${req.params.id}`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: `delete student notes successfully` });
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



module.exports = { getAllStudentnoteController, getStudentnoteByIDController, addNewStudentnoteController, updateStudentnoteController, deleteStudentnoteController }