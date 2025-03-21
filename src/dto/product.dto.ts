import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  originalPrice?: number;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  @Type(() => String) // ✅ Fix lỗi `@IsString({ each: true })`
  gallery?: string[];

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  features: string;

  // 🛠️ Thêm validation cho các thuộc tính specifications
  @IsNotEmpty()
  @IsString()
  weight: string;

  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  holdLevel: string;

  @IsNotEmpty()
  @IsString()
  shineLevel: string;

  @IsNotEmpty()
  @IsString()
  ingredients: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => Date) // ✅ Fix lỗi `expiry` sang `Date`
  expiry: string;

  @IsNotEmpty()
  @IsString()
  usage: string;
}
