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
  async getById(@Param('id') id: number) {
    const produ = await this.productService.getById(id);
    if (!produ) throw new NotFoundException('Product not found');
    return produ;
  }

  @Post('/')
  async createProduct(@Body() productPayload: CreateProductDTO) {
    try {
      const { id, name, price, description, shortDescription, color, sizes, images } = productPayload;

      const sizeQuantity = sizes.map(({ size, quantity }) => ({ size, quantity }));

      const createdProduct = await this.productService.createProductWithSizesAndImages(
        id,
        name,
        price,
        description,
        shortDescription,
        color,
        sizeQuantity,
        images,
      );

      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() productData: UpdateProductDTO) {
    if (!(await this.productService.getById(id)))
      throw new NotFoundException('Product not found');

    await this.productService.updateById(id, productData);
    return { success: true };
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: number) {
    if (!(await this.productService.getById(id)))
      throw new NotFoundException('Book not found');
    await this.productService.deleteById(id);
    return { success: true };
  }
}
