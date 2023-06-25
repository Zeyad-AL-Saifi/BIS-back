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
  FROM teacher WHERE email = '${req.body.email}'`,
    (error, result) => {
      if (error) {
        res.status(400);
        res.json(error);
      } else if (result.rows.length < 1) {
        res.status(404);
        res.json({ message: "email not found" })
      } else {
        res.status(200);
        res.json(result.rows)
      }
      const secret = process.env.SECRETKEY + result.rows.password;
      const token = jwt.sign({ email: result.rows.email }, secret);


      const link = `http://localhost:4500/reset-password/${result.rows.email}/${token}`;


      const sentToemail = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      });
      const options = {
        user: process.env.USER_EMAIL,
        to: result.rows.email,
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

      res.json({ message: "Click on the link ", resetPasswordLink: link });









    })





});

// module.exports.getResetPasswordView = handler(async (req, res) => {
//   const user = await Users.findById(req.params.userId);
//   if (!user) {
//     return res.status(404).send("users not found");
//   }

//   const secret = process.env.SECRETKEY + user.password;

//   try {
//     jwt.verify(req.params.token, secret);
//     res.render("reset-password");
//   } catch (error) {
//     console.log(error);
//     res.json({ message: "Error" });
//   }
// });

// module.exports.restPasswordPage = handler(async (req, res) => {
//   //TODO:validation
//   const user = await Users.findById(req.params.userId);
//   if (!user) {
//     return res.status(404).send("users not found");
//   }

//   const secret = process.env.SECRETKEY + user.password;

//   try {
//     jwt.verify(req.params.token, secret);

//     const salt = await bcrypt.genSalt(10);
//     req.body.password = await bcrypt.hash(req.body.password, salt);
//     user.password = req.body.password;

//     await user.save();
//     res.render("success-password");
//   } catch (error) {
//     console.log(error);
//     res.json({ message: "Error" });
//   }
// });


module.exports = { forgotPasswordController }