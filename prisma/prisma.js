import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;
  
async function main() {
  const users = await prisma.user.findMany();
  const projects = await prisma.project.findMany();
  const commits = await prisma.commit.findMany();
  console.log({ users, projects, commits });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
