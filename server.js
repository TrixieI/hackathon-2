const express = require("express");
const env = require("dotenv");
const knex = require("knex");
const path = require("path");
const fetch = require("node-fetch");
const bcrypt = require("bcryptjs");
env.config();
const app = express();
const port = process.env.PORT;
// const db = require("./modules/db.js");
env.config();
const db = knex({
  client: process.env.CLIENTDB,
  connection: {
    host: process.env.HOSTDB,
    port: process.env.DBPORTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASEDB,
    ssl: { rejectUnauthorized: false },
  },
});

app.use(express.urlencoded());
app.use(express.json());

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

app.use(express.static(__dirname + "/public"));

app.get("/registration", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/registration.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.get("/travel", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/travel.html"));
});

// app.get("/users", (req, res) => {
//   return db("users")
//     .select("user_id", "username", "password", "city")

//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => console.log(error));
// });
app.post("/register", async (req, res) => {
  const reqUser = req.body.username;
  const reqPass = req.body.password;
  const reqCity = req.body.city;
  if (!reqUser || !reqPass || !reqCity) {
    res.send("Sorry please enter information into the fields");
    return;
  }

  const reqPassHash = bcrypt.hashSync(reqPass, 10);

  // Check if user exists or not
  const exists = await db("users")
    .select("username")
    .where("username", reqUser);
  if (exists.length > 0) {
    res.send("Sorry, this user already exists! please try again!");
    return;
  }
  db("users")
    .returning(["username", "password", "city"])
    .insert({
      username: reqUser,
      password: reqPassHash,
      city: reqCity,
    })
    .then((data) => console.log(data));
  res.sendFile(path.resolve(__dirname, "public/index.html"));
  return;
});

app.post("/login", async (req, res) => {
  const reqUser = req.body.username;
  const reqPass = req.body.password;

  const exists = await db("users")
    .select("password")
    .where("username", reqUser);
  const reqPassHash = bcrypt.compareSync(reqPass, exists[0].password);
  if (reqPassHash) {
    res.sendFile(path.resolve(__dirname, "public/travel.html"));
    return;
  } else {
    res.send("Incorrect username or password!");
    return;
  }
});
