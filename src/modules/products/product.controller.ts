import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessager, HttpStatus } from 'src/global/globalEnum';
import { Product } from 'src/models/product.models';
import { ProductDto } from 'src/dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}
  @Get()
  getProducts(): ResponseData<Product[]> {
    try {
      return new ResponseData<Product[]>(
        this.productsService.getProducts(),
        HttpStatus.SUCCESS,
        HttpMessager.SUCCESS,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return new ResponseData<Product[]>(
        [],
        HttpStatus.ERROR,
        HttpMessager.ERROR,
      );
    }
  }
  @Post()
  createProducts(
    @Body(new ValidationPipe()) productDto: ProductDto,
  ): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productsService.createProducts(productDto),
        HttpStatus.SUCCESS,
        HttpMessager.SUCCESS,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessager.ERROR,
      );
    }
  }
  @Get('/:id')
  detaiProduct(@Param('id', ParseIntPipe) id: number): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productsService.detaiProduct(id),
        HttpStatus.SUCCESS,
        HttpMessager.SUCCESS,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return new ResponseData<Product>(
        [],
        HttpStatus.ERROR,
        HttpMessager.ERROR,
      );
    }
  }
  @Patch('/:id')
  updateProduct(
    @Body() productDto: ProductDto,
    @Param('id') id: number,
  ): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.productsService.updateProduct(productDto, id),
        HttpStatus.SUCCESS,
        HttpMessager.SUCCESS,
      );
    } catch (error: any) {
      console.error('Update Product Error:', error); // Log lỗi để kiểm tra
      return new ResponseData<Product>(
        null,
        HttpStatus.ERROR,
        HttpMessager.ERROR,
      );
    }
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number): ResponseData<boolean> {
    try {
      return new ResponseData<boolean>(
        this.productsService.deleteProduct(id),
        HttpStatus.SUCCESS,
        HttpMessager.SUCCESS,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return new ResponseData<boolean>(
        null,
        HttpStatus.ERROR,
        HttpMessager.ERROR,
      );
    }
  }
}
