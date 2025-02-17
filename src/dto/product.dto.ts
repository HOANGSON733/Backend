import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  categoryId?: number;

  @MinLength(5, { message: 'Bạn phải chuyền trên 5 ký tự vào nè!!!' })
  productName?: string;

  @IsNumber()
  price?: number;
}
