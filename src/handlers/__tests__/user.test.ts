import * as user from "../user";

describe("User Handler", () => {
  it("Should create a new user", async () => {
    // Create a mock req qnd res structure
    const req = { body: { username: "Hello", password: "World" } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };

    await user.createUser(req, res, () => { });
  });
});
