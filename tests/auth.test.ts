import app from "./../src/app.js";
import supertest from "supertest";
import prisma from "./../src/config/database.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE sessions CASCADE`;
})

describe("POST /user/signup", () => {
    it("given a valid email and password it should return 201", async () => {
        const body = {
            email: "carol99@teste.com",
            password: "0123456789"
        };

        const result = await supertest(app).post("/user/signup").send(body);
        const status = result.status;

        expect(status).toEqual(201);
    });

    it("given a registered email and password it should return 409", async () => {
        const body = {
            email: "carol99@teste.com",
            password: "0123456789"
        };
        
        await supertest(app).post("/user/signup").send(body);
        const result = await supertest(app).post("/user/signup").send(body);
        const status = result.status;

        expect(status).toEqual(409);
    });

    it("given a valid email and invalid password it should return 400", async() => {
        const body = {
            email: "carol100@teste.com",
            password: "123"
        };

        const result = await supertest(app).post("/user/signup").send(body);
        const status = result.status;

        expect(status).toEqual(400);
    });

    it("given an empty email and valid password it should return 400", async() => {
        const body = {
            email: "",
            password: "0123456789"
        };

        const result = await supertest(app).post("/user/signup").send(body);
        const status = result.status;

        expect(status).toEqual(400);
    });

    it("given a valid email and empty password it should return 400", async() => {
        const body = {
            email: "carol101@teste.com",
            password: "ihde"
        };

        const result = await supertest(app).post("/user/signup").send(body);
        const status = result.status;

        expect(status).toEqual(400);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
})