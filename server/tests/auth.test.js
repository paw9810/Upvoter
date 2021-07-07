const request = require("supertest");
const app = require("../app");
const db = require("../models");

afterAll(async () => {
  return await db.sequelize.sync({ force: true });
});

describe("POST /auth/refresh no token to refresh", () => {
  test("should respond with 401 status code", async () => {
    const response = await request(app).post("/auth/refresh");

    expect(response.statusCode).toBe(401);
  });
});

describe("POST /auth/register", () => {
  describe("clear register", () => {
    test("should respond with 201 status code", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send({
          name: "testuser",
          password: "12345",
          email: "test@test.pl",
        })
        .set("Content-Type", "application/json");

      expect(response.statusCode).toBe(201);
    });
  });

  describe("user already exists", () => {
    test("should respond with 400 status code", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send({
          name: "testuser",
          password: "12345",
          email: "test@test.pl",
        })
        .set("Content-Type", "application/json");

      expect(response.statusCode).toBe(400);
    });
  });
});

describe("POST /auth/login", () => {
  describe("clear login", () => {
    test("should respond with 200 status code", async () => {
      await request(app)
        .post("/auth/register")
        .send({
          name: "testuser2",
          password: "12345",
          email: "test@test2.pl",
        })
        .set("Content-Type", "application/json");
      const response = await request(app)
        .post("/auth/login")
        .send({
          name: "testuser2",
          password: "12345",
        })
        .set("Content-Type", "application/json");

      expect(response.statusCode).toBe(200);
    });
  });
});
