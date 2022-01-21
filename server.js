const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


app.use("/travel", express.static(__dirname + "/public/travel.html"));
app.get("/", (req, res) => res.send("Hello World!"));
