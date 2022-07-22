import { faker } from "@faker-js/faker";

export async function createNewUser(passwordLength = 10) {
    const newUser = {
        email: faker.internet.email(),
        password: faker.internet.password(passwordLength)
    }

    return newUser;
};