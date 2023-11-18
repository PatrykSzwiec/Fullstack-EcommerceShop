import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    const user = {
      email: 'user3@example.com',
      // role: Role.USER, // If you're not using Role, you can exclude it
    };

    const createdUser = await prisma.user.create({
      data: user,
    });

    const password = {
      hashedPassword:
        '$2a$10$tQMBN3sCc0aIdTm4i84/MeONDAUz96xnvgkOWbX.9R4gaoIDJxPly',
      userId: createdUser.id,
    };

    await prisma.password.create({
      data: password,
    });

    const products = [
      {
        id: 3,
        name: 'Product 3',
        price: 10,
        description: 'Description of Product 1',
        shortDescription: 'Short description 1',
        color: 'black',
        sizes: {
          create: [{ size: 'M', quantity: 10 }],
        },
        images: {
          create: [
            {
              url: './../uploads/0685816002-1.jpg',
            },
          ],
        },
      },
    ];

    await Promise.all(
      products.map(async (product) => {
        await prisma.product.create({
          data: {
            ...product,
          },
        });
      })
    );

    console.log('Seed data has been inserted.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
