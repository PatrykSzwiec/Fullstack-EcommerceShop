import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDTO, UpdateCartItemDTO } from './dtos/cart-dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserCart(userId: string) {
    return this.prismaService.cart.findUnique({
      where: { userId },
      include: { products: true },
    });
  }

  async addToCart(createCartItemDTO: CreateCartItemDTO) {
    const { userId, productId, size, quantity } = createCartItemDTO;
  
    const userCart = await this.prismaService.cart.findUnique({
      where: {
        userId: userId, // Make sure userId is provided in the DTO
      },
      include: {
        products: true,
      },
    });
  
    if (userCart) {
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
      });
  
      if (product) {
        const cartItem = await this.prismaService.productSize.create({
          data: {
            product: { connect: { id: productId } },
            size,
            quantity,
            // Remove the cart object from here as productSize doesn't have a direct relationship to cart
          },
        });
        return cartItem;
      } else {
        throw new NotFoundException('Product not found');
      }
    } else {
      throw new NotFoundException('User cart not found');
    }
  }

  async updateCartItem(cartItemId: number, updateCartItemDTO: UpdateCartItemDTO) {
    const { newQuantity } = updateCartItemDTO;
    return this.prismaService.productSize.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });
  }

  async removeCartItem(cartItemId: number) {
    return this.prismaService.productSize.delete({
      where: { id: cartItemId },
    });
  }

  async finalizeOrder(userId: string) {
    const userCart = await this.prismaService.cart.findUnique({
      where: { userId },
      include: { products: true },
    });

    if (userCart && userCart.products.length > 0) {
      const productId = userCart.products[0].id;
      // Perform actions to finalize order and update quantities
      // ...

      // Clear user's cart after finalizing order
      await this.prismaService.cart.update({
        where: { id: userCart.id },
        data: { products: { disconnect: { id: productId } } },
      });

      return 'Order finalized successfully';
    } else {
      throw new NotFoundException('User cart or products not found');
    }
  }
}