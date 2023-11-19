import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma,Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        images: true,
        sizes: true,
      },
    });
  }

  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        images: true,
        sizes: true,
      },
    });
  }

  public async createProductWithSizesAndImages(
    id: number,
    name: string,
    price: number,
    description: string,
    shortDescription: string,
    color: string,
    sizes: { size: string; quantity: number }[],
    images: { url: string }[],
  ): Promise<Product> {
    try {
      const createdProduct = await this.prismaService.product.create({
        data: {
          id,
          name,
          price,
          description,
          shortDescription,
          color,
          sizes: {
            create: sizes.map(({ size, quantity }) => ({ size, quantity })),
          },
          images: {
            create: images,
          },
        },
      });
  
      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  public async updateById(
    id: Product['id'],
    productData: Partial<Omit<Product, 'id'>>,
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: {
        ...productData,
      },
    });
  }

  public deleteById(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
