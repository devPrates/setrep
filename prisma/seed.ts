import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";

const prisma = new PrismaClient({ log: ["warn", "error"] });

async function main() {
  const email = "admin@example.com";
  const password = "admin123"; // uso exclusivo para ambiente de desenvolvimento

  const passwordHash = await hash(password);

  // Cria ou atualiza o usuário admin (papel: personal)
  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: "personal",
    },
    create: {
      email,
      passwordHash,
      role: "personal",
      personalProfile: {
        create: {
          biografia: "Admin do SetRep (dev)",
        },
      },
    },
  });

  console.info({ message: "Seed concluída", userId: admin.id, email });
}

main()
  .catch((err) => {
    console.error("Erro ao executar seed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });