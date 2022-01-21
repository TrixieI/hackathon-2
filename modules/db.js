// const knex = require("knex");
// const express = require("express");
// const env = require("dotenv");
// const app = express();

// app.use(express.urlencoded());
// app.use(express.json());

// env.config();
// const db = knex({
//   client: process.env.CLIENTDB,
//   connection: {
//     host: process.env.HOSTDB,
//     port: process.env.DBPORTDB,
//     user: process.env.USERDB,
//     password: process.env.PASSWORDDB,
//     database: process.env.DATABASEDB,
//     ssl: { rejectUnauthorized: false },
//   },
// });

// const getUsers = () => {
//   return db("users").select("user_id", "username", "password", "city");
// };

// const addUser = (req, res) => {
//   return db("users")
//     .returning(["username", "password", "city"])
//     .insert({
//       username: req.body.username,
//       password: req.body.password,
//       city: req.body.city,
//     })
//     .then((data) => console.log(data))
// };

// module.exports = {
//   getUsers,
//   addUser,
// };
