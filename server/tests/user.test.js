const request = require("supertest");
const app = require("../app");
const db = require("../models");

afterAll(async () => {
  return await db.sequelize.sync({ force: true });
});

describe("GET /users/all unauthenticated", () => {
  test("should respond with 403 status code", async () => {
    const response = await request(app).get("/users/all");
    expect(response.statusCode).toBe(403);
  });
});

let cookie = null;

describe("GET /users/all authenticated", () => {
  test("should respond with 200 status code", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        name: "testuser",
        password: "12345",
        email: "test@test2.pl",
      })
      .set("Content-Type", "application/json");
    const login = await request(app)
      .post("/auth/login")
      .send({
        name: "testuser",
        password: "12345",
      })
      .set("Content-Type", "application/json");

    cookie = login.header["set-cookie"][0];
    const response = await request(app).get("/users/all").set("Cookie", cookie);
    expect(response.statusCode).toBe(200);
  });
});
