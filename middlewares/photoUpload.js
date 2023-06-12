const path = require("path");

const multer = require("multer");

//photo storage
const photoStorege = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "../images"));
    },
    filename: function (req, file, callback) {
        if (file) {
            callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
        } else {
            callback(null, false);
        }
    }

});

//photo upload middleware
const photoUpload = multer({
    storage: photoStorege,
    fileFilter: function (req, file, callback) {
        if (file.mimetype.startsWith("image")) {
            callback(null, true)
        } else {
            callback({ message: "unsupported file format" }, false)
        }
    },
    limits: { fileSize: 1024 * 1024 }//1 megabyte

});


module.exports = photoUpload;