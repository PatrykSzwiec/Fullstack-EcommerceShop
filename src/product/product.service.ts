import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        images: true,
      },
    });
  }

  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });
  }

  public async create(productData: Product): Promise<Product> {
    try {
      return await this.prismaService.product.create({
        data: productData,
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('Title is already taken');
      if (error.code === 'P2025')
        throw new BadRequestException("Author doesn't exist");
      throw error;
    }
  }

  public async updateById(
    id: Product['id'],
    productData: Omit<Product, 'id'>,
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
