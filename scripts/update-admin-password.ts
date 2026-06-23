import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const novaSenha = "65f77c394c3e87468f28ce5705339f29ac17b151";

  const hash = await bcrypt.hash(
    novaSenha,
    12
  );

  await prisma.user.update({
    where: {
      email: "admin@kaelor.com",
    },
    data: {
      password: hash,
    },
  });

  console.log(
    "Senha alterada para:",
    novaSenha
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });