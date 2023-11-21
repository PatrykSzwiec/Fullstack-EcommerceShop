import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dtos/order-dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('add')
  async createOrder(@Body() createOrderDTO: CreateOrderDTO): Promise<any> {
    return this.orderService.createOrder(createOrderDTO);
  }

  @Get(':orderId')
  async getOrderDetails(@Param('orderId') orderId: number): Promise<any> {
    return this.orderService.getOrderDetails(orderId);
  }

}