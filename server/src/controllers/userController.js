const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminUser = require("../models/AdminUser");

const generateAccessTocken = (id, email) => {
  const payload = {
    id,
    email,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

const createUser = async (req, res) => {
  const { name, password } = req.body;

  const heshPass = bcrypt.hashSync(password, 5);

  const newData = {
    name,
    password: heshPass,
  };

  const admninUser = new AdminUser(newData);

  // await admninUser.createTable();
  const user = await admninUser.allUsers();
  console.log("user", user);
  // AdminUser.addUser();

  res.status(200).json({ message: "user created" });
};

module.exports = { createUser };
