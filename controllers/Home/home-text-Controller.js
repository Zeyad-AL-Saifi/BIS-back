
const handler = require("express-async-handler");
const client = require('../../config/db')

const getHomeTextController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.text_home_content`
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

const updateHomeTextController = handler(async (req, res) => {
    const reqB = req.body;
    const newRes = reqB.main_text.replace('\'', '`')
    await client.query(`UPDATE public.text_home_content
        SET  "main_text"='${newRes}'
        WHERE "text_id" = '1'`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: "update  home text successfully" });
            } else {
                res.status(400);
                res.send({ message: error });
            }
            client.end;
        }

    )



})


module.exports = { getHomeTextController, updateHomeTextController };