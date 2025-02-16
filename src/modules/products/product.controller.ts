import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessager, HttpStatus } from 'src/global/globalEnum';

@Controller('produscts')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}
  @Get()
  getProducts(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.productsService.getProducts(),
        HttpStatus.SUCCESS,
        HttpMessager.SUCCESS,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return new ResponseData<string>(
        ' null | string[]',
        HttpStatus.ERROR,
        HttpMessager.ERROR,
      );
    }
  }
  @Post()
  createProducts(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.productsService.createProducts(),
        HttpStatus.SUCCESS,
        HttpMessager.SUCCESS,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return new ResponseData<string>(
        ' null | string[]',
        HttpStatus.ERROR,
        HttpMessager.ERROR,
      );
    }
  }
  @Get('/:id')
  detaiProduct(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.productsService.deleteProduct(),
        HttpStatus.SUCCESS,
        HttpMessager.SUCCESS,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return new ResponseData<string>(
        ' null | string[]',
        HttpStatus.ERROR,
        HttpMessager.ERROR,
      );
    }
  }
  @Put('/:id')
  updateProduct(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.productsService.updateProduct(),
        HttpStatus.SUCCESS,
        HttpMessager.SUCCESS,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return new ResponseData<string>(
        ' null | string[]',
        HttpStatus.ERROR,
        HttpMessager.ERROR,
      );
    }
  }
  @Delete('/:id')
  deleteProduct(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.productsService.deleteProduct(),
        HttpStatus.SUCCESS,
        HttpMessager.SUCCESS,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return new ResponseData<string>(
        ' null | string[]',
        HttpStatus.ERROR,
        HttpMessager.ERROR,
      );
    }
  }
}
