const handler = require("express-async-handler");
const client = require('../../config/db')
const Joi = require('joi');

const { validationHomeNews } = require('../../validation/validationFunction')



const getAllNewsController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.news_home_content`
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

const getNewsByIDController = handler(async (req, res) => {
    await client.query(
        `SELECT * FROM public.news_home_content
        WHERE "news_id"=${req.params.id}`
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

const addNewNewsController = handler(async (req, res) => {
    const reqB = req.body;
    const { error } = validationHomeNews(req.body);
    if (error) {
        res.json({ message: error.details[0].message })
    } else {
        await client.query(`INSERT INTO public.news_home_content(
        "title", "content")
        VALUES('${reqB.title}','${reqB.content}')`,
            (error, result) => {
                if (!error) {
                    res.status(201);
                    res.json({ message: "add news successfully" });
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


const updateNewsController = handler(async (req, res) => {
    const reqB = req.body;
    const filterContent = reqB.content.replace('\'', '`')
    const filterTitle = reqB.title.replace('\'', '`')

    const { error } = validationHomeNews(req.body);
    if (error) {
        res.json({ message: error.details[0].message })
    } else {
        await client.query(`UPDATE public.news_home_content
	SET  "title"='${filterTitle}',"content"='${filterContent}'
    WHERE "news_id"=${req.params.id} 
    `,
            (error, result) => {
                if (!error) {
                    res.status(201);
                    res.json({ message: "update news successfully" });
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

const deleteNewsController = handler(async (req, res) => {
    await client.query(`DELETE FROM public.news_home_content
	WHERE "news_id"=${req.params.id}`,
        (error, result) => {
            if (!error) {
                res.status(201);
                res.json({ message: `delete news successfully` });
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



module.exports = { getAllNewsController, getNewsByIDController, addNewNewsController, updateNewsController, deleteNewsController };