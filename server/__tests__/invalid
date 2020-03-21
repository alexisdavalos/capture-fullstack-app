const request = require("supertest"); //initiates supertest
const server = require("../api/server.js"); // initiates server
const db = require("../data/dbConfig.js"); // initiates db
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

afterAll(async () => {
  await db.destroy();
});

//initialize test user credentials from seed user
const user = {
  username: "test_user",
  password: "password"
};
//declare token generation function
function generateToken(user) {
  const payload = {
    username: user.username,
    role: user.role || "user"
  };

  const options = {
    expiresIn: "1h" //token expires after 1h
  };
  return jwt.sign(payload, jwtSecret, options);
}

//initialize token
const token = generateToken(user);
//initilialize global users array
let users = [];
describe("Users-Router Test Starts", () => {
  it("Should run the test", () => {
    expect(true).toBe(true);
  });
}),
  describe("Users-Router Endpoints", () => {
    test("GET to /api/users", async () => {
      //initiate a request to the server
      const res = await request(server)
        //declare endpoint
        .get("/api/users")
        .set("authorization", token);
      //does it return the expected status code?
      expect(res.status).toBe(200);
      //does it return the expected data format?
      expect(res.type).toMatch(/json/);
      //does it return the expected data?
      expect(res.body[0].username).toBe("test_user");
      expect(res.body[0].first_name).toBe("John");
      expect(res.body[0].last_name).toBe("Doe");
      expect(res.body[0].email).toBe("johndoe@gmail.com");
      users = res.body;
    });

    test("GET to /api/users/:id", async () => {
      // initiate a request to the server
      const res = await request(server)
        //declare endpoint
        .get(`/api/users/${users[users.length - 1].id}`)
        //set token to header
        .set("authorization", token);
      //does it return the expected status code?
      expect(res.status).toBe(200);
      //does it return the expected data format?
      expect(res.type).toMatch(/json/);
      //does it return the expected data?
      expect(res.body.username).toBe("test_user");
      expect(res.body.first_name).toBe("John");
      expect(res.body.last_name).toBe("Doe");
      expect(res.body.email).toBe("johndoe@gmail.com");
    });

    test("GET to /api/users/:id/posts", async () => {
      const res = await request(server)
        //declare endpoint
        .get(`/api/users/${users[users.length - 1].id}/posts`)
        //set token to header
        .set("authorization", token);
      //does it return the expected status code?
      expect(res.status).toBe(200);
      //does it return the expected data format?
      expect(res.type).toMatch(/json/);
      expect(Array.isArray(res.body)).toBe(true);
      //does it return the expected data?
      expect(res.body[0].title).toBe("My First Post");
      expect(res.body[0].body).toBe(
        "This is one of my very first trips shared on Capture!"
      );
    });

    test("PUT to /api/users/:id", async () => {
      //initiate a request to the server
      const register = await request(server)
        //declare endpoint
        .post("/api/auth/register")
        //send a body
        //Register User
        .send({
          username: "put_test",
          password: "password",
          first_name: "put_test",
          last_name: "put_test",
          email: "put_test@gmail.com"
        });
      //does it return the expected status code?
      expect(register.status).toBe(200);
      //does it return the expected data format?
      expect(register.type).toMatch(/json/);
      //does it return the expected data?
      expect(register.body[0].username).toBe("put_test");

      const put = await request(server)
        //declare endpoint
        .put(`/api/users/${register.body[0].id}`)
        //set token to header
        .set("authorization", token)
        .send({
          username: "put_test_updated",
          password: "password",
          first_name: "put_test",
          last_name: "put_test",
          email: "put_test@gmail.com"
        });
      //does it return the expected status code?
      expect(put.status).toBe(200);
      //does it return the expected data format?
      expect(put.type).toMatch(/json/);
      //does it return the expected data?
      expect(put.body.success).toBe("updated");
      expect(put.body.id).toBe(register.body[0].id);

      //delete user with id
      const del = await request(server)
        .delete(`/api/users/${put.body.id}`)
        .set("authorization", token);
      expect(del.body.success).toBe("deleted");
    });

    test("DELETE to /api/users/:id", async () => {
      //initiate a request to the server
      const register = await request(server)
        //declare endpoint
        .post("/api/auth/register")
        //send a body
        //Register User
        .send({
          username: "del_test",
          password: "password",
          first_name: "del_test",
          last_name: "del_test",
          email: "del_test@gmail.com"
        });
      //does it return the expected status code?
      expect(register.status).toBe(200);
      //does it return the expected data format?
      expect(register.type).toMatch(/json/);
      //does it return the expected data?
      expect(register.body[0].username).toBe("del_test");

      const res = await request(server)
        //declare endpoint
        .delete(`/api/users/${register.body[0].id}`)
        //set token to header
        .set("authorization", token);
      //does it return the expected status code?
      expect(res.status).toBe(200);
      //does it return the expected data format?
      expect(res.type).toMatch(/json/);
      //does it return the expected data?
      expect(res.body.success).toBe("deleted");
    });
  });
