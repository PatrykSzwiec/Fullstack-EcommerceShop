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
import * as fs from 'fs';

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
  @UseGuards(JwtAuthGuard)
  async create(@Body() productData: CreateProductDTO) {
    if (productData.images && productData.images.length > 0) {
      productData.images = productData.images.map((base64Data, index) => {
        const fileName = `image_${index + 1}.jpg`; // You can generate a unique file name here
        const filePath = `./../../public/uploads/${fileName}`;

        // Save the image data as a file
        fs.writeFileSync(filePath, base64Data, 'base64');

        return `/uploads/${fileName}`; // Save the relative image path in the database
      });
    }
    return this.productService.create(productData);
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
