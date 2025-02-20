import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "src/dto/product.dto";
import { ResponseData } from "src/global/globalClass";
import { ProductEntity } from "./product.entity";
import { HttpMessager, HttpStatus } from "src/global/globalEnum";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post()
  async createProduct(@Body() productDto: CreateProductDto): Promise<ResponseData<ProductEntity>> {
    try {
      const newItem = await this.productService.createProduct(productDto);
      return new ResponseData<ProductEntity>(newItem, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, error.message || HttpMessager.ERROR);
    }
  }


  @Get()
  async getProducts(): Promise<ResponseData<ProductEntity[]>> {
    try {
      const items = await this.productService.getProducts();
      return new ResponseData<ProductEntity[]>(items, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<ProductEntity[]>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Get(':id')
  async getProductDetail(@Param('id') id: number) {
    return this.productService.getProductDetail(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: number, @Body() updateData: Partial<CreateProductDto>) {
    return this.productService.updateProduct(id, updateData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}