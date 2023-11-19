import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDTO, UpdateCartItemDTO } from './dtos/cart-dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  async findUserCart(@Param('userId') userId: string) {
    try {
      const userCart = await this.cartService.findUserCart(userId);
      return { success: true, data: userCart };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('add')
  async addToCart(@Body() createCartItemDTO: CreateCartItemDTO) {
    try {
      const addedItem = await this.cartService.addToCart(createCartItemDTO);
      return { success: true, data: addedItem };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Patch('update/:cartItemId')
  async updateCartItem(@Param('cartItemId') cartItemId: number, @Body() updateCartItemDTO: UpdateCartItemDTO) {
    try {
      const updatedItem = await this.cartService.updateCartItem(cartItemId, updateCartItemDTO);
      return { success: true, data: updatedItem };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Delete('remove/:cartItemId')
  async removeCartItem(@Param('cartItemId') cartItemId: number) {
    try {
      const removedItem = await this.cartService.removeCartItem(cartItemId);
      return { success: true, data: removedItem };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Patch('finalize/:userId')
  async finalizeOrder(@Param('userId') userId: string) {
    try {
      const finalizedOrder = await this.cartService.finalizeOrder(userId);
      return { success: true, data: finalizedOrder };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}