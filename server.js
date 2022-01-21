const express = require("express");
const env = require("dotenv");
env.config();
const app = express();
const port = process.env.PORT;
const db = require("./modules/db.js");

app.use(express.urlencoded());
app.use(express.json());


app.listen(port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

app.use("/travel", express.static(__dirname + "/public/travel.html"));

app.use("/", express.static(__dirname + "/public/index.html"));

app.use("/register", express.static(__dirname + "/public/register.html"));

app.get("/users", (req, res) => {
  db.getUsers()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => console.log(error));
});

app.post("/login", (req, res) => {
  db.addUsers()
    .then((data) => {
      console.log("before json " + data);
      res.json(data);
      console.log("after json " + data);
    })
    .catch((error) => console.log(error));
});