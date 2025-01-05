import request from "supertest";
import { app } from "../../app";

it("Returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
});

it("Returns a 400 on bad email input", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "testtest.com", password: "password" })
    .expect(400);
});

it("Returns a 400 on invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "testtest.com", password: "1" })
    .expect(400);
});

it("Returns a 400 on no email & no password input", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});