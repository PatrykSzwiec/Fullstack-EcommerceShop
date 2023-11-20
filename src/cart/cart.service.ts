import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDTO, UpdateCartItemDTO } from './dtos/cart-dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  async addProductToCart(createCartItemDTO: CreateCartItemDTO) {
    const { userId, productId, size, quantity } = createCartItemDTO;
  
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { cart: true },
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const productSize = await this.prismaService.productSize.findFirst({
      where: { productId, size },
    });
  
    if (!productSize || productSize.quantity < quantity) {
      throw new NotFoundException('Selected size not available or insufficient quantity');
    }
  
    let cart = user.cart;
  
    if (!cart) {
      cart = await this.prismaService.cart.create({
        data: {
          userId,
          cartItems: {
            create: [{ productId, size, quantity }],
          },
        },
        include: { cartItems: true },
      });
    } else {
      const existingCartItem = await this.prismaService.cartItem.findFirst({
        where: { cartId: cart.id, productId, size },
      });
  
      if (existingCartItem) {
        await this.prismaService.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: { increment: quantity } },
        });
      } else {
        await this.prismaService.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            size,
            quantity,
          },
        });
      }
  
      cart = await this.prismaService.cart.findUnique({
        where: { id: cart.id },
        include: { cartItems: true },
      });
    }
  
    return cart;
  }

  async getCartItems(userId: string) {
    const cart = await this.prismaService.cart.findUnique({
      where: { userId },
      include: { 
        cartItems: { 
          include: { 
            product: {
              include: {
                images: true,
              }
            } 
          } 
        } 
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found for this user');
    }

    return cart.cartItems;
  }

  async updateCartItemQuantity(cartItemId: number, newQuantity: number) {
    console.log('Updating cart item:', cartItemId, 'New quantity:', newQuantity);
    if (newQuantity <= 0) {
      // Remove the item from the cart if the quantity is zero or less
      return this.removeCartItem(cartItemId);
    }

    return this.prismaService.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });
  }

  async removeCartItem(cartItemId: number) {
    return this.prismaService.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}

