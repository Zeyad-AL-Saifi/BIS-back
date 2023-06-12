
const { Client } = require("pg");
let client = new Client({
  host: "localhost",
  port: 5151,
  database: "BIS",
  user: "postgres",
  password: "admin",
});
try {
  client.connect();
  console.log("Database Connection...");
} catch (error) {
  console.log(error + "somthing woring");
}

module.exports = client;
