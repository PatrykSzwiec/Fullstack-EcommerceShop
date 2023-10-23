import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateProductDTO } from './dtos/create-product-dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  getAll() {
    return this.productService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const produ = await this.productService.getById(id);
    if (!produ) throw new NotFoundException('Product not found');
    return produ;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  create(@Body() productData: CreateProductDTO) {
    return this.productService.create(productData);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    if (!(await this.productService.getById(id)))
      throw new NotFoundException('Product not found');

    await this.productService.updateById(id, productData);
    return { success: true };
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string) {
    if (!(await this.productService.getById(id)))
      throw new NotFoundException('Book not found');
    await this.productService.deleteById(id);
    return { success: true };
  }
}
