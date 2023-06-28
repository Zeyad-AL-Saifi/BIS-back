# BIS-back
  1- first for all to run this file make sure the applecation include these packegs



  2- this app deals with postgresql data base so make sure you have a connection with it on this informaion
  host: "localhost",
  port: 5151,
  database: "BIS",
  user: "postgres",
  password: "admin",
  this informaion will be in project/config/db
  this the database on goole drive https://drive.google.com/file/d/1O6kv0iOBvVCS_1yLOjv8i0vtKPdNl9-U/view?usp=drive_link
  this screenshot for database ![Screenshot (48)](https://github.com/Zeyad-AL-Saifi/BIS-back/assets/90261049/22a291c2-4fdf-4083-a9c2-a58f483a8bfe)


  3-lastly
  the server run in port 4500 ==> you can see in this file project/config/server
  you can run this app use (npm i) then  (npm start)


  the project upload the images for outsite server (cloudinary)
  if you got any error in image please tell me 


  "scripts": {
    "start": "nodemon app"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cloudinary": "^1.37.1",
    "cors": "^2.8.5",
    "dotenv": "^16.1.4",
    "express": "^4.18.2",
    "express-async-handler": "^1.2.0",
    "fs": "^0.0.1-security",
    "helmet": "^7.0.0",
    "joi": "^17.9.2",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.3",
    "pg": "^8.11.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
