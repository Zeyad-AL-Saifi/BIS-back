const handler = require("express-async-handler");
const client = require('../../config/db')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


const forgotPasswordController = handler(async (req, res) => {
  const user = await client.query(`
  SELECT password,email
  FROM students WHERE email = '${req.body.email}'
  UNION ALL
  SELECT password,email
  FROM teacher WHERE email = '${req.body.email}'`,)
  // res.send(user)
  if (user.rowCount == 0) {
    return res.status(404).send("users not found");
  } else {
    const email = user.rows[0].email;

    const secret = process.env.SECRETKEY ;
    const token = jwt.sign( {email} , secret);

    //TODO:this link most be dynamic
    const link = `http://localhost:3000/after-code/${email}/${token}`;
    const sentToemail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });
    const options = {
      user: process.env.USER_EMAIL,
      to: email,
      subject: "Reset Password Link",
      html: `<div>
    <h4>
    Click on the link below to reset the passowed
    <p>${link}</p>
    </h4>
    </div>`,
    };
    sentToemail.sendMail(options, function (error, success) {
      if (error) {
        console.log(error);
        res.status(500).json(error);
      } else {
        console.log("Email send " + success.response);
        res.render("link-send");
      }
    });
    res.status(200).send({ massege: "Check your email" })
    //  res.json({ message: "Click on the link ", resetPasswordLink: link });
  }
});



module.exports = { forgotPasswordController }