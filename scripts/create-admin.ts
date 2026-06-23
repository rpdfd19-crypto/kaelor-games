import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    "123456",
    12
  );

  const existingAdmin =
    await prisma.user.findUnique({
      where: {
        email: "admin@kaelor.com",
      },
    });

  if (existingAdmin) {
    console.log("Admin já existe");
    return;
  }

  const admin = await prisma.user.create({
    data: {
      name: "Vitor",
      email: "admin@kaelor.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("Admin criado:");
  console.log(admin.email);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });