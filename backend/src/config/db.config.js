const mongoose = require("mongoose");
const { MONGO_URI, NODE_ENV } = require("./server.config");

async function connectToDB() {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log("Unable to connect to the DB server");
    console.log(error);
  }
}

module.exports = connectToDB;
