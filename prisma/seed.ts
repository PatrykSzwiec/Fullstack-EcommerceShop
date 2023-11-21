import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    const products = [
      {
        id: 1970819001,
        name: 'Relaxed Fit Hoodie',
        price: 19,
        description: 'Hoodie in sweatshirt fabric made from a cotton blend.',
        shortDescription: 'Hoodie in sweatshirt fabric',
        color: 'Black',
        sizes: {
          create: [
            { size: 'XS', quantity: 10 },
            { size: 'S', quantity: 14 },
            { size: 'M', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1970819001-1.jpg',
            },
            {
              url: './../uploads/1970819001-2.jpg',
            },
            {
              url: './../uploads/1970819001-3.jpg',
            },
          ],
        },
      },
      {
        id: 1970818001,
        name: 'Relaxed Fit Sweatshirt',
        price: 15,
        description:
          'Relaxed fit with dropped shoulders and ribbing around the neckline',
        shortDescription: 'Top in sweatshirt ',
        color: 'White',
        sizes: {
          create: [
            { size: 'XS', quantity: 10 },
            { size: 'S', quantity: 14 },
            { size: 'M', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1970818001-1.jpg',
            },
            {
              url: './../uploads/1970818001-2.jpg',
            },
            {
              url: './../uploads/1970818001-3.jpg',
            },
          ],
        },
      },
      {
        id: 1024256001,
        name: 'Slim Jeans',
        price: 25,
        description: '5-pocket jeans in cotton denim with a slight stretch',
        shortDescription: '5-pocket jeans in cotton denim',
        color: 'black',
        sizes: {
          create: [
            { size: 'XS', quantity: 10 },
            { size: 'S', quantity: 14 },
            { size: 'M', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1024256001-1.jpg',
            },
            {
              url: './../uploads/1024256001-2.jpg',
            },
            {
              url: './../uploads/1024256001-3.jpg',
            },
          ],
        },
      },
      {
        id: 1005941001,
        name: 'Slim Fit jumper',
        price: 28,
        description:
          'Slim-fit jumper in fine-knit cotton with a stand-up collar',
        shortDescription: 'Slim-fit jumper in fine-knit ',
        color: 'Green',
        sizes: {
          create: [
            { size: 'XS', quantity: 10 },
            { size: 'S', quantity: 14 },
            { size: 'M', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1005941001-1.jpg',
            },
            {
              url: './../uploads/1005941001-2.jpg',
            },
            {
              url: './../uploads/1005941001-3.jpg',
            },
          ],
        },
      },
      {
        id: 1065654029,
        name: 'SpiderMan Hoodie',
        price: 33,
        description: 'Hoodie in sweatshirt fabric made from a cotton blend.',
        shortDescription: 'Hoodie in sweatshirt ',
        color: 'White',
        sizes: {
          create: [
            { size: 'XS', quantity: 10 },
            { size: 'S', quantity: 14 },
            { size: 'M', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1065654029-1.jpg',
            },
            {
              url: './../uploads/1065654029-2.jpg',
            },
            {
              url: './../uploads/1065654029-3.jpg',
            },
          ],
        },
      },
      {
        id: 1201823001,
        name: 'Regular Fit Sequined shirt',
        price: 38,
        description:
          'Regular-fit shirt in a sequined weave with a turn-down collar',
        shortDescription: 'Regular-fit shirt in a sequined weave',
        color: 'Black',
        sizes: {
          create: [
            { size: 'XS', quantity: 10 },
            { size: 'S', quantity: 14 },
            { size: 'M', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1201823001-1.jpg',
            },
            {
              url: './../uploads/1201823001-2.jpg',
            },
            {
              url: './../uploads/1201823001-3.jpg',
            },
          ],
        },
      },
      {
        id: 1190144004,
        name: 'Wool-blend coat',
        price: 55,
        description:
          'Single-breasted coat in felted fabric made from a wool blend',
        shortDescription: 'Single-breasted coat ',
        color: 'Blue',
        sizes: {
          create: [
            { size: 'XS', quantity: 10 },
            { size: 'S', quantity: 14 },
            { size: 'M', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1190144004-1.jpg',
            },
            {
              url: './../uploads/1190144004-2.jpg',
            },
            {
              url: './../uploads/1190144004-3.jpg',
            },
          ],
        },
      },
      {
        id: 1811107021,
        name: 'Regular Fit Pyjama',
        price: 28,
        description:
          'Regular-fit pyjamas with a long-sleeved top in cotton jersey ',
        shortDescription: '2 Piece Regular-fit pyjamas ',
        color: 'Black',
        sizes: {
          create: [
            { size: 'XS', quantity: 10 },
            { size: 'S', quantity: 14 },
            { size: 'M', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1811107021-1.jpg',
            },
            {
              url: './../uploads/1811107021-2.jpg',
            },
            {
              url: './../uploads/1811107021-3.jpg',
            },
          ],
        },
      },
      {
        id: 1875217045,
        name: 'Overshirt',
        price: 10,
        description: 'Overshirt in a soft weave with a collar',
        shortDescription: 'Overshirt in a soft weave with a collar',
        color: 'Grey',
        sizes: {
          create: [
            { size: 'M', quantity: 10 },
            { size: 'L', quantity: 14 },
            { size: 'XL', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1875217045-1.jpg',
            },
            {
              url: './../uploads/1875217045-2.jpg',
            },
            {
              url: './../uploads/1875217045-3.jpg',
            },
          ],
        },
      },
      {
        id: 1072992004,
        name: 'Teddy-lined overshirt',
        price: 10,
        description: 'Lightly padded overshirt in soft cotton twill',
        shortDescription: 'Lightly padded overshirt',
        color: 'Green',
        sizes: {
          create: [
            { size: 'M', quantity: 10 },
            { size: 'L', quantity: 14 },
            { size: 'XL', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1072992004-1.jpg',
            },
            {
              url: './../uploads/1072992004-2.jpg',
            },
            {
              url: './../uploads/1072992004-3.jpg',
            },
          ],
        },
      },
      {
        id: 1040615001,
        name: 'Imitation leather jacket',
        price: 65,
        description: 'Jacket in soft imitation leather',
        shortDescription: 'Jacket in soft imitation leather with a collar',
        color: 'black',
        sizes: {
          create: [
            { size: 'M', quantity: 10 },
            { size: 'L', quantity: 14 },
            { size: 'XL', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1040615001-1.jpg',
            },
            {
              url: './../uploads/1040615001-2.jpg',
            },
            {
              url: './../uploads/1040615001-3.jpg',
            },
          ],
        },
      },
      {
        id: 1065654028,
        name: 'Relaxed Fit Hoodie',
        price: 33,
        description: 'Hoodie in sweatshirt fabric made from',
        shortDescription: 'Hoodie in sweatshirt',
        color: 'Grey',
        sizes: {
          create: [
            { size: 'M', quantity: 10 },
            { size: 'L', quantity: 14 },
            { size: 'XL', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1065654028-1.jpg',
            },
            {
              url: './../uploads/1065654028-2.jpg',
            },
            {
              url: './../uploads/1065654028-3.jpg',
            },
          ],
        },
      },
      {
        id: 1163728004,
        name: 'Water-repellent puffer jacket',
        price: 45,
        description: 'Regular-fit puffer jacket in windproof',
        shortDescription: 'Regular-fit puffer jacket in windproof',
        color: 'Green',
        sizes: {
          create: [
            { size: 'M', quantity: 10 },
            { size: 'L', quantity: 14 },
            { size: 'XL', quantity: 22 },
          ],
        },
        images: {
          create: [
            {
              url: './../uploads/1163728004-1.jpg',
            },
            {
              url: './../uploads/1163728004-2.jpg',
            },
            {
              url: './../uploads/1163728004-3.jpg',
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
