import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      name: "Vitor",
      email: "admin@kaelor.com",
      password: "123456",
      role: "admin",
    },
  });

  console.log(admin);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });