import { IsString, IsEnum, Length, IsArray, ArrayMinSize, IsInt } from 'class-validator';

enum Color {
  Black = 'Black',
  Red = 'Red',
  Blue = 'Blue',
  Green = 'Green',
}

export class UpdateProductDTO {
  // Making name mandatory
  @IsString()
  @Length(3, 100)
  name: string;

  // Other properties as before
  @IsInt()
  price?: number;

  @IsString()
  description?: string;

  @IsString()
  shortDescription?: string;

  @IsEnum(Color)
  color: Color;

  @IsArray()
  @ArrayMinSize(1)
  sizes?: { size: string; quantity: number }[];

  @IsArray()
  @ArrayMinSize(1)
  images?: { url: string }[];

  @IsString()
  cartId?: string;
}