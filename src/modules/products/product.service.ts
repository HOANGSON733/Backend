import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "src/dto/product.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) {}

  async createProduct(productDto: CreateProductDto) {
    const newProduct = this.productRepository.create({
      ...productDto,
      gallery: productDto.gallery ? JSON.stringify(productDto.gallery) : "[]",
      features: productDto.features ? JSON.stringify(productDto.features) : "[]",
    });

    return await this.productRepository.save(newProduct);
  }

  async getProducts() {
    return await this.productRepository.find();
  }

  async getProductDetail(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }
    return {
      ...product,
      gallery: JSON.parse(product.gallery || "[]"),
      features: JSON.parse(product.features || "[]"),
    };
  }

  async updateProduct(id: number, updateData: Partial<CreateProductDto>) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Sản phẩm với ID ${id} không tồn tại!`);
    }

    const updatedProduct = this.productRepository.create({
      ...product,
      ...updateData,
      gallery: updateData.gallery ? JSON.stringify(updateData.gallery) : product.gallery,
      features: updateData.features ? JSON.stringify(updateData.features) : product.features,
    });

    return await this.productRepository.save(updatedProduct);
  }
  async getProductById(id: number): Promise<ProductEntity | null> { // Thêm phương thức này
    return await this.productRepository.findOne({ where: { id } });
  }
  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    await this.productRepository.delete(id);
    return { message: "Đã xóa sản phẩm thành công!" };
  }
}
