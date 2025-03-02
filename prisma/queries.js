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

export async function getProjects() {
    try {
        const projects = await prisma.project.findMany();
        return projects;
    } catch (error) {
        console.error(error);
        return []
    }
}

export async function createProject(userId, name, url, description, githubToken) {
  try {
      const project = await prisma.project.create({
          data: {
              projectName: name, // Ensure this matches Prisma schema
              url,
              description,
              githubToken,
              user: {
                  connect: { id: userId },
              },
          },
      });

      console.log("Project created successfully:", project);
      return project;
  } catch (error) {
      console.error("Error creating project:", error);
      throw error;
  }
}
