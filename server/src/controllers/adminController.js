const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminUser = require("../models/AdminUser");

const generateAccessTocken = (id, name) => {
  const payload = {
    id,
    name,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const heshPass = bcrypt.hashSync(password, 5);

    const newData = {
      name,
      password: heshPass,
    };

    const admninUser = new AdminUser(newData);
    await admninUser.createTable();

    const user = await admninUser.findOneUser();

    if (user) {
      return res.status(400).json({ message: "The user exists" });
    }
    await admninUser.createUser();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const newData = {
      name,
      password,
    };

    const admninUser = new AdminUser(newData);
    await admninUser.createTable();
    const user = await admninUser.findOneUser();

    if (!user) {
      return res.status(400).json({
        message: "No such user exists",
      });
    }

    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({
        message: "The password is incorrect",
      });
    }

    const token = generateAccessTocken(user.id, name);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (e) {
    res.status(400).json({ message: "Error login" });
  }
};

const auth = async (req, res) => {
  try {
    const admninUser = new AdminUser(null, req.user.id);

    const user = await admninUser.findOneUserById();

    const token = generateAccessTocken(user.id, user.name);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Error auth" });
  }
};

module.exports = { loginAdmin, createUser, auth };
