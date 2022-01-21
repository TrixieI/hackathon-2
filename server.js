const express = require("express");
const env = require("dotenv");
const knex = require("knex");
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

app.use("/travel", express.static(__dirname + "/public/travel.html"));

app.use("/home", express.static(__dirname + "/public/index.html"));

app.use(
  "/registration",
  express.static(__dirname + "/public/registration.html")
);

app.get("/users", (req, res) => {
  return db("users")
    .select("user_id", "username", "password", "city")

    .then((data) => {
      res.json(data);
    })
    .catch((error) => console.log(error));
});

app.post("/home", (req, res) => {
  res.redirect("/home");
  return db("users")
    .returning(["username", "password", "city"])
    .insert({
      username: req.body.username,
      password: req.body.password,
      city: req.body.city,
    })
    .then((data) => console.log(data));
});
