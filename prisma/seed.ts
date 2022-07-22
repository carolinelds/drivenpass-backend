import prisma from "./../src/config/database.js";
import bcrypt from "bcrypt";

async function main(){
    
    const SALT = +process.env.BCRYPT_SALT;
    const hashedPassword = bcrypt.hashSync("0123456789", SALT);

    await prisma.users.upsert({
        where: { email: "carol@testes.com" },
        update: {},
        create: {
            email: "carol@testes.com",
            password: hashedPassword
        }
    });
};

try {
    main();
} catch(e) {
    console.log(e);
    process.exit(1);
} finally {
    async () => await prisma.$disconnect();
}
