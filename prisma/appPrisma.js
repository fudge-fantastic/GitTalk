import prisma from "./prisma.js";
// Hash the password before storing it
import bcrypt from "bcrypt";

async function main() {

  const hashedPassword = await bcrypt.hash("1234", 10);
  const user = await prisma.user.create({
    data: {
      userName: "Blue Salt",
      email: "test@gmail.com",
      password: hashedPassword,
    },
  });
  console.log("User created:", user);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
