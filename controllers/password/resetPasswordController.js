
const handler = require("express-async-handler");
const client = require('../../config/db')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


const updateTeacherPassword = handler(async (email, newPassword, res) => {


    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);
    const query = `UPDATE public.teacher 
    SET "password" = '${newPassword}'  
    WHERE "email" = '${email}'`;
    const values = [newPassword, email];

    try {
        await client.query(query);
        return res.send({ message: 'teacher password updated successfully.' });
    } catch (error) {
        return res.send({ message: 'Error updating teacher password:', error });
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
        return res.send({ message: 'Student password updated successfully.' });
    } catch (error) {
        return res.send({ message: 'Error updating student password:', error });
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
            return res.send({ message: 'Email not found in teacher and student tables.' });
        }
    }

})

module.exports = { updatePassword }