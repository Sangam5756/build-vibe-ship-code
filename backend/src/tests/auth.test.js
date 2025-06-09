const request = require("supertest");
const express = require("express");
const routes = require("../routes");
const connectDB = require("../config/db.config");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use("/api", routes);

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {
  const testUser = {
    username: "testuser",
    password: "testpass123",
  };

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered");
  });

  it("should login the user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("username", testUser.username);
  });

  it("should not login with wrong password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ username: testUser.username, password: "wrongpass" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
