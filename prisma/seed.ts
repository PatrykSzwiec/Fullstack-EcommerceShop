/* eslint-disable prettier/prettier */
import { PrismaClient, Color, Size, Role} from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {

  const user = {
    email: 'user3@example.com',
    role: Role.USER
  };

  const createdUser = await prisma.user.create({
    data: user,
  });

  const password = {
    hashedPassword: "$2a$10$tQMBN3sCc0aIdTm4i84/MeONDAUz96xnvgkOWbX.9R4gaoIDJxPly",
    userId: createdUser.id
  }

  const createdPassword = await prisma.password.create({
    data: password,
  })
  const products = [
    {
      id: 3,
      name: 'Product 3',
      price: 10,
      description: 'Description of Product 1',
      shortDescription: 'Short description 1',
      color: Color.Black,
      size: Size.M,
      images: {
        create: [
          {
            url: './../uploads/0685816002-1.jpg',
          },
          // Add more images for Product 1 as needed
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
    }
  ));

  // Example: Create a cart for a user
  const cart = {
    id: '5482d995-1e97-42ff-bd8c-cb53026efbd1', // Replace with the actual UUID
    userId: createdUser.id, // Replace with the ID of an existing user
    products: {
      connect: [{ id: 1 }], // Connect products to the cart
    },
  };

  await prisma.cart.create({
    data: cart,
  });

  // Example: Create an order for a user
  const order = {
    id: '23a9abd5-4ce0-4997-af40-c4d3ea2ba8d2', // Replace with the actual UUID
    userId: createdUser.id, // The ID of the user who placed the order
    products: {
      connect: [{ id: 1 }], // Connect products to the order
    },
  };

  await prisma.order.create({
    data: order,
  });

  console.log('Seed data has been inserted.');
}

seed()
  .catch((error) => {
    console.error('Error seeding the database:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });