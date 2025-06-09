const User = require("../models/user.model");

const findByUsername = (username) => User.findOne({ username });
const createUser = (userData) => new User(userData).save();

module.exports = { findByUsername, createUser };
