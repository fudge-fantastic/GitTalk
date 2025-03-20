import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;

async function main() {
    const user = await prisma.user.findMany();
    const project = await prisma.project.findMany();
    const commit = await prisma.commit.findMany();
    console.log({ user, project, commit });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
