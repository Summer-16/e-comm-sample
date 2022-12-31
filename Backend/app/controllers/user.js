const db = require("../models");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const config = require('../config');
const jwtSecretKey = config.jwt.key;
const User = db.user;
const logger = require('../utils/logger')('user')

exports.create = async (req, res) => {

  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    res.json({ success: false, message: "All fields are mandatory" });
    return;
  }

  let passwordHash = await bcrypt.hash(password, config.saltRounds)

  const user = new User({
    name: name,
    username: username,
    password: passwordHash
  });

  user.save(user)
    .then(data => {
      res.json({ success: true, message: "User created successfully" });
    })
    .catch(err => {
      logger.error(err);
      res.json({ success: false, message: err.message || "Some error occurred while creating the User." });
    });
};

exports.list = (req, res) => {
  const { filter } = req.body;
  const condition = filter && Object.keys(filter).length ? filter : {};

  User.find(condition)
    .then(data => {
      res.json({ success: true, message: data });
    })
    .catch(err => {
      logger.error(err);
      res.json({ success: false, message: err.message || "Some error occurred while retrieving User." });
    });
};

exports.login = async (req, res) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return reject("Both Fields are mandatory");
    }

    const condition = { username: username };

    let data = await User.findOne(condition);
    data = JSON.parse(JSON.stringify(data));
    if (!data) {
      return reject("Login failed , User not found");
    }
    let passCheck = await bcrypt.compare(password, data.password)
    if (data.username === username && passCheck) {
      const userData = { username, name: data.name };
      const token = jwt.sign(userData, jwtSecretKey, { expiresIn: '1d' });
      return res.json({ success: true, message: "Login Success", data: { token, userData } });
    } else {
      return res.json({ success: false, message: "Login failed , Check Email or Password." });
    }
  } catch (error) {
    logger.error(error);
    res.json({ success: false, message: "Login failed , Check Email or Password." });
  }
}

exports.createDefaultAdmin = async (req, res) => {
  const { defaultAdmin } = config;
  const adminExist = await User.find({ name: defaultAdmin.name, username: defaultAdmin.username });

  if (!adminExist.length) {
    const userObj = JSON.parse(JSON.stringify(defaultAdmin));
    userObj.password = await bcrypt.hash(userObj.password, config.saltRounds);
    const user = new User(userObj);
    await user.save(user);
  }
};