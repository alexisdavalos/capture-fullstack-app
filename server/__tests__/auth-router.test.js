const request = require('supertest'); //initiates supertest
const server = require('../api/server.js') // initiates server
const db = require('../data/dbConfig.js');  // initiates db
const jwt = require('jsonwebtoken')
const {closeConnection} = require('../utils/closeConnection.js')


afterAll(async () =>{
    await db.destroy();
})
 //initialize test user to register
let user = {
    username: "alexis",
    password: "password",
    first_name: "alexis",
    last_name: "Toasdf",
    email: "alesxis@gmail.com"
 }
 
 describe("Auth Test Starts", () => {
     it("Should run the test", () => {
         expect(true).toBe(true);
     });
 }),
 
describe('Auth-Router Endpoints', () =>{
    
    test('POST to /api/auth/register', async () =>{
        
        //initiate a request to the server
        const res = await request(server)
        //declare endpoint
        .post('/api/auth/register')
        //send a body
        .send(user)
        //does it return the expected status code?
        expect(res.status).toBe(200);
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body[0].username).toBe('alexis');
    })

    test('Generate JWT Test', async () =>{
        
        const res = await request(server)
        .post('/api/auth/login')
        //send seed user to test
        .send(user)

        //does it return the expected status code?
        expect(res.status).toBe(200)
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.message).toBe('Welcome alexis!')

        //Decode Token from response body
        const decoded = jwt.decode(res.body.token);

        //is the user signed to the token?
        expect(decoded.username).toBe('alexis')        
    })

    test('POST to /api/auth/login', async () =>{
        //initiate a request to the server
        const res = await request(server)
        .post('/api/auth/login')
        //send registered user from previous test
        .send(user)
        //does it return the expected status code?
        expect(res.status).toBe(200)
        //does it return the expected data format?
        expect(res.type).toMatch(/json/)
        //does it return the expected data?
        expect(res.body.message).toBe('Welcome alexis!')
        
        //delete user with id
        const del = await request(server)
        .delete(`/api/users/${res.body.id}`)
        .set("authorization", res.body.token)
        expect(del.body.success).toBe('deleted')

    })

})