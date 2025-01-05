import request from "supertest";
import { app } from "../../app";

it("Responds with details about the current user", async () => {
  const cookie = await signin();

  if (!cookie) {
    throw new Error("Cookie not set after signup");
  }
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("Responds with null if unauthenticated", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(res.body.currentUser).toEqual(null);
});