const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create Users
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'ADMIN',
      },
    });

    const supervisor1 = await prisma.user.create({
      data: {
        name: 'Supervisor One',
        email: 'supervisor1@example.com',
        password: 'password123', 
        role: 'SUPERVISOR',
      },
    });

    const supervisor2 = await prisma.user.create({
      data: {
        name: 'Supervisor Two',
        email: 'supervisor2@example.com',
        password: 'password123', 
        role: 'SUPERVISOR',
      },
    });

    const normalUsers = await Promise.all(
      Array.from({ length: 5 }).map((_, i) =>
        prisma.user.create({
          data: {
            name: `Normal User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            password: 'password123',
            role: 'USER',
          },
        })
      )
    );

    const allUsers = [adminUser, supervisor1, supervisor2, ...normalUsers];

 
    const project1 = await prisma.project.create({
      data: {
        name: 'Project Alpha',
        description: 'The first project for testing.',
        ownerId: supervisor1.id,
        assignedUsers: {
          connect: [normalUsers[0], normalUsers[1]],
        },
      },
    });

    const project2 = await prisma.project.create({
      data: {
        name: 'Project Beta',
        description: 'The second project for demonstration.',
        ownerId: supervisor2.id,
        assignedUsers: {
          connect: [normalUsers[2], normalUsers[3], normalUsers[4]],
        },
      },
    });

  
    await prisma.task.createMany({
      data: [
        {
          title: 'Task A1',
          description: 'First task in Project Alpha.',
          projectId: project1.id,
          assignedToId: normalUsers[0].id,
          priority: 'HIGH',
        },
        {
          title: 'Task A2',
          description: 'Second task in Project Alpha.',
          projectId: project1.id,
          assignedToId: normalUsers[1].id,
          status: 'IN_PROGRESS',
          priority: 'MEDIUM',
        },
        {
          title: 'Task A3',
          description: 'Third task in Project Alpha.',
          projectId: project1.id,
          assignedToId: normalUsers[0].id,
          status: 'COMPLETED',
          priority: 'LOW',
        },
      ],
    });


    await prisma.task.createMany({
      data: [
        {
          title: 'Task B1',
          description: 'First task in Project Beta.',
          projectId: project2.id,
          assignedToId: normalUsers[2].id,
          priority: 'MEDIUM',
        },
        {
          title: 'Task B2',
          description: 'Second task in Project Beta.',
          projectId: project2.id,
          assignedToId: normalUsers[3].id,
          priority: 'HIGH',
        },
        {
          title: 'Task B3',
          description: 'Third task in Project Beta.',
          projectId: project2.id,
          assignedToId: normalUsers[4].id,
          status: 'PENDING',
          priority: 'LOW',
        },
      ],
    });

    console.log('Mock data created successfully!');
  } catch (error) {
    console.error('Error creating mock data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();