import supertest from "supertest";
import app from "../server";

describe("GET /", () => {
  it("Should respond with 'Hello'", async () => {
    const res = await supertest(app).get("/");
    expect(res.body.message).toBe("hello");
  });
});
