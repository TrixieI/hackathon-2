const knex = require("knex");
const env = require("dotenv");
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

const getUsers = () => {
  return db("users").select("user_id", "username", "password", "city");
};

const addUser = () => {
  return db("users").returning([username, password, city]).insert({
    username: req.body.username,
    password: req.body.passowrd,
    city: req.body.city,
  });
};

module.exports = {
  getUsers,
  addUser,
};
