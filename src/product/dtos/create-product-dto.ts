/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, IsInt, Length, IsEnum, IsArray, ArrayMinSize } from 'class-validator';

enum Color {
  Black = 'Black',
  Red = 'Red',
  Blue = 'Blue',
  Green = 'Green',
}

export class CreateProductDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsEnum(Color)
  color: Color;

  @IsArray()
  @ArrayMinSize(1)
  sizes: { size: string; quantity: number }[];

  @IsArray()
  @ArrayMinSize(1)
  images: { url: string }[];
}
