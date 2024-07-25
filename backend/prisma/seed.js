import { PrismaClient } from '@prisma/client';
import { bcrypt } from '../app/utils/index.js';
const prisma = new PrismaClient()
async function main() {
    await prisma.user.createMany({
        data: [
            {
                email: "test@gmail.com",
                fullName: "Test User",
                userName: "test",
                phoneNumber: "+923000000000",
                password: bcrypt.hash("12345678"),
            },
            {
                email: "test2@gmail.com",
                fullName: "Test2 User",
                userName: "test",
                phoneNumber: "+923000000000",
                password: bcrypt.hash("12345678"),
            },
        ]
    })

    await prisma.bankDetails.createMany({
        data: [
            {
                userId: 1,
                upiId: "4123121311231",
                code: "223",
                ifscCode: "2312",
                name: "Test User",
                accountNumber: "3413123145124124",
                bankName: "Test Bank Name"
            }
        ]
    })

    await prisma.merchant.create({
        data: {},
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })