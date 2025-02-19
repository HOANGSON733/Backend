import { Body, Controller, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "src/dto/product.dto";
import { ResponseData } from "src/global/globalClass";
import { ProductEntity } from "./product.entity";
import { HttpMessager, HttpStatus } from "src/global/globalEnum";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post()
  async createProduct(@Body() productDto: CreateProductDto): Promise<ResponseData<ProductEntity>>{
    try {
      const newItem = await this.productService.createProduct(productDto);
      return new ResponseData<ProductEntity>(newItem, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch(error) {
      return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, error.message || HttpMessager.ERROR);
    }
  }

}