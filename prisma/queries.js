import prisma from "./prisma.js";

export async function getUsers() {
    try {
        const users = await prisma.user.findMany();
        const projects = await prisma.project.findMany();
        return [users, projects];
    } catch (error) {
        console.error(error);
        return []
    }
}