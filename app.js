
const express = require("express");
const app = require("./config/server");
require("dotenv").config();
const loggerMidd = require("./middlewares/logger");

const middlewaresHandlerError = require("./middlewares/error");
const helmet = require("helmet");
const cors = require("cors");

//Apply Middelware 
app.use(express.json()); //to get data from json as object
app.use(express.urlencoded({ extended: false }));////to get data from json as array
app.use(loggerMidd);

//Helmet to add http headers for more security
app.use(helmet())

// cors policy to work in your react server in port 3000
app.use(cors());

//Router
const studentsRouter = require("./routes/student/students");
const teachersRouter = require("./routes/teacher/teacher");
const HomeText = require("./routes/Home-content/home-text");
const HomeImages = require("./routes/Home-content/home-image");
const HomeNews = require("./routes/Home-content/home-news");
const StudentNote = require("./routes/student/student-notes");
const TeacherNote = require("./routes/teacher/teacher-notes");
const authStudent = require("./routes/auth/authStudent");
const authTeacher = require("./routes/auth/authTeacher");
const login = require("./routes/auth/login");
const forgotPassword = require("./routes/password/forgot-password");
const ResetPassword = require("./routes/password/reset-password");
app.use("/students", studentsRouter);
app.use("/teachers", teachersRouter);
app.use("/home/text", HomeText);
app.use("/home/images", HomeImages);
app.use("/home/news", HomeNews);
app.use("/studentnote", StudentNote);
app.use("/teachernote", TeacherNote);
app.use("/registration/teacher", authTeacher);
app.use("/registration/student", authStudent);
app.use("/login", login);
app.use("/forgot-password", forgotPassword);
app.use("/after-code", ResetPassword);


//erro handler

app.use(middlewaresHandlerError.notFound);
app.use(middlewaresHandlerError.handlerError);