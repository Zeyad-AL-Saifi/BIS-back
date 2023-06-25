
const handler = require("express-async-handler");
const client = require('../../config/db')

const { validationHometext } = require('../../validation/validationFunction');
const getHomeTextController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.text_home_content`
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

const updateHomeTextController = handler(async (req, res) => {
    const reqB = req.body;
   const newRes= reqB.main_text.replace('\'','`')
        await client.query(`UPDATE public.text_home_content
        SET  "main_text"='${newRes}'
        WHERE "text_id" = '1'`,
            (error, result) => {
                if (!error) {
                    res.status(201);
                    res.json({ message: "update  home text successfully" });
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


module.exports = { getHomeTextController, updateHomeTextController };