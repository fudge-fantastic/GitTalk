## Prisma and Basic SQL Setup

```shell
npm install prisma --save-dev # To install Prisma
npm uninstall prisma          # To uninstall Prisma

# Invoke Prisma
npx prisma init
```

## [Connect Prisma with Database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-mysql)

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./mydatabase.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  firstName String
  lastname  String
  email     String    @unique
  password  String
  credits   Int       @default(100)
  projects  Project[]
}

model Project {
  id          Int      @id @default(autoincrement())
  name        String
  url         String   @unique
  githubToken String?
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}
```
Save and run the following command
```shell
# Run the migration after making changes in the Prisma Schema
npx prisma migrate dev --name <any_name>

# Reset the database
npx prisma migrate reset

# Ensure to generate the Prisma Client
npx prisma generate
```

