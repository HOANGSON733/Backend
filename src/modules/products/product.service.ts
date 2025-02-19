import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "src/dto/product.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) { }
  async createProduct(productDto: CreateProductDto) {
    const newItem = this.productRepository.create(productDto);
    const saveItem = await this.productRepository.save(newItem)
    return saveItem
  }
}