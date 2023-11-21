import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDTO, UpdateCartItemDTO } from './dtos/cart-dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() createCartItemDTO: CreateCartItemDTO) {
    return this.cartService.addProductToCart(createCartItemDTO);
  }

  @Get(':userId')
  async getCartItems(@Param('userId') userId: string) {
    return this.cartService.getCartItems(userId);
  }

  @Patch('update/:cartItemId')
  async updateCartItem(@Param('cartItemId') cartItemId: number, @Body() updateCartItemDTO: UpdateCartItemDTO) {
    return this.cartService.updateCartItemQuantity(cartItemId, updateCartItemDTO.newQuantity);
  }

  @Delete('remove/:cartItemId')
  async removeCartItem(@Param('cartItemId') cartItemId: number) {
    return this.cartService.removeCartItem(cartItemId);
  }

  @Delete('clear/:userId')
  async clearUserCart(@Param('userId') userId: string) {
    return this.cartService.clearUserCart(userId);
  }
}