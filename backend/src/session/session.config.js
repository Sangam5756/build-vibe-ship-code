const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
dotenv.config();

const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, 
    collectionName: "sessions",
    ttl: 14 * 24 * 60 * 60, // 14 days
  }),
  secret: process.env.SESSION_SECRET || "super-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000, // 1 day
    httpOnly: true,
    secure: false,
  },
});

module.exports = sessionMiddleware;
