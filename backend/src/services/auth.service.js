const bcrypt = require("bcrypt");
const { findByUsername, createUser } = require("../repository/user.repository");

const registerUser = async ({ username, password }) => {
  const existing = await findByUsername(username);
  if (existing) throw new Error("Username already exists");

  const passwordHash = await bcrypt.hash(password, 10);
  return createUser({ username, passwordHash });
};


const loginUser = async ({ username, password }) => {
  const user = await findByUsername(username);
  if (!user) throw new Error("Invalid username or password");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid username or password");

  return { user };
};

module.exports = { registerUser, loginUser };
