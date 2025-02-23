import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;
  
async function main() {
  const users = await prisma.user.findMany();
  console.log("All Users:", users);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
