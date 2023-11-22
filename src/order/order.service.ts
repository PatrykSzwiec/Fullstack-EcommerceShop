import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDTO } from './dtos/order-dto';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(createOrderDTO: CreateOrderDTO): Promise<any> {
    try {
      return this.prismaService.$transaction(async (prisma) => {
        const {
          userId,
          cartItems,
          totalPrice,
          name,
          surname,
          postCode,
          city,
          address,
          country,
        } = createOrderDTO;
        

        // Create the order within the transaction
        const createdOrder = await prisma.order.create({
          data: {
            userId,
            products: {
              create: cartItems.map((item) => ({
                productId: item.productId,
                size: item.size,
                quantity: item.quantity,
                comments: item.comments,
              })),
            },
            totalPrice,
            name,
            surname,
            postCode,
            city,
            address,
            country,
          },
        });

        if (!createdOrder) {
          console.error('Order creation failed');
          throw new Error('Order creation failed');
        }

        //console.log('Order created:', createdOrder);

        return createdOrder;
      });
    } catch (error) {
      console.error('Error occurred while creating order:', error);
      throw error;
    }
  }

  async getOrderDetails(orderId: number): Promise<any> {
    return this.prismaService.order.findUnique({
      where: { id: orderId },
      include: { products: true },
    });
  }

}