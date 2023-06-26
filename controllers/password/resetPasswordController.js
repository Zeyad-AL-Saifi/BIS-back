
const handler = require("express-async-handler");
const client = require('../../config/db')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


const updateTeacherPassword = handler(async (email, newPassword, res) => {


    // const secret = process.env.SECRETKEY + newPassword;
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);
    const query = `UPDATE public.teacher 
    SET "password" = '${newPassword}'  
    WHERE "email" = '${email}'`;
    const values = [newPassword, email];

    try {
        await client.query(query);
        res.send({ massege: 'teacher password updated successfully.' });
    } catch (error) {
        res.send({ massege: 'Error updating teacher password:', error });
    }
});



const updateStudentPassword = handler(async (email, newPassword, res) => {
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);
    const query = `
    UPDATE public.students 
    SET "password" = '${newPassword}' 
    WHERE "email" = '${email}'`;

    try {
        await client.query(query);
        res.send({ massege: 'Student password updated successfully.' });
    } catch (error) {
        res.send({ massege: 'Error updating student password:', error });
    }
})




const updatePassword = handler(async (req, res) => {
    const email = req.params.email
    const newPassword = req.body.password

    const teacherResult = await client.query(`
    SELECT * 
    FROM public.teacher
    WHERE "email" = '${email}'`);
    if (teacherResult.rows.length > 0) {
        await updateTeacherPassword(email, newPassword, res);
    } else {
        const studentResult = await client.query(`
        SELECT *
        FROM public.students
        WHERE "email" = '${email}'`);

        if (studentResult.rows.length > 0) {
            await updateStudentPassword(email, newPassword, res);
        } else {
            res.send({ massege: 'Email not found in teacher and student tables.' });
        }
    }

})

module.exports = { updatePassword }