/* eslint-disable prettier/prettier */
import { PrismaClient, Color, Size } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  // Example: Create some products
  const products = [
    {
      id: '1',
      name: 'Product 1',
      price: 10,
      description: 'Description of Product 1',
      shortDescription: 'Short description 1',
      color: Color.Black,
      size: Size.M,
    },
    {
      id: '2',
      name: 'Product 2',
      price: 15,
      description: 'Description of Product 2',
      shortDescription: 'Short description 2',
      color: Color.Red, // Should match one of the enum values (e.g., 'Red')
      size: Size.M, // Should match one of the enum values (e.g., 'L')
    },
    // Add more products as needed
  ];

  await Promise.all(
    products.map((product) => {
      return prisma.product.create({
        data: product,
      });
    })
  );

  // Example: Create a cart for a user
  const cart = {
    id: '1', // Replace with the actual UUID
    userId: '1', // The ID of the user who owns the cart
    products: {
      connect: [{ id: '1' }, { id: '2' }], // Connect products to the cart
    },
  };

  await prisma.cart.create({
    data: cart,
  });

  // Example: Create an order for a user
  const order = {
    id: '1', // Replace with the actual UUID
    userId: '1', // The ID of the user who placed the order
    products: {
      connect: [{ id: '1' }, { id: '2' }], // Connect products to the order
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