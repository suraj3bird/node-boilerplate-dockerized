import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("hello123", 10),
    role: "ADMIN",
    status: "ACTIVE"
  },
  {
    firstName: "Client",
    lastName: "User",
    email: "client@gmail.com",
    password: bcrypt.hashSync("hello123", 10),
    role: "CLIENT",
    status: "ACTIVE"
  }
];

async function seed() {
	const user = await prisma.user.findFirst({
		where: {
			email: 'admin@gmail.com'
		}
	});
	if (!user) {
    await prisma.user.createMany({
      data: users
    });
	}
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
