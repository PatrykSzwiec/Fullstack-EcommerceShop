/* eslint-disable prettier/prettier */

enum Color {
  Black = 'Black',
  Red = 'Red',
  Blue = 'Blue',
  Green = 'Green',
}

enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

import {
  IsNotEmpty,
  IsString,
  IsInt,
  Length,
  IsEnum,
  IsArray,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsEnum(Size)
  size: Size;

  @IsArray()
  @ArrayMinSize(1)
  images: string[];
}