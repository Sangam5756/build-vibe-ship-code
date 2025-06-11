const express = require("express");
const { PORT } = require("./config/server.config");
const connectToDB = require("./config/db.config");
const apiRouter = require("./routes");
const loggerMiddleware = require("./utils/loggerMiddleware");
const errorHandler = require("./utils/errorHandler");
const sessionMiddleware = require("./session/session.config");



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);
app.use(loggerMiddleware);

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
  await connectToDB();
  console.log("Successfully connected to db");
});
