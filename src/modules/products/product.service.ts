import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "./product.entity";
import { CreateProductDto } from "src/dto/product.dto";
import path from "path";
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) { }

  async createProduct(productDto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = this.productRepository.create({
      ...productDto,
      gallery: productDto.gallery || [], // Đảm bảo gallery là mảng
      features: productDto.features ? JSON.stringify(productDto.features) : "", // Chuyển thành JSON
    });
    return this.productRepository.save(newProduct);
  }

  async getProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }

  async updateProduct(id: number, updateData: Partial<CreateProductDto>): Promise<ProductEntity> {
    const product = await this.getProductById(id);

    if (updateData.gallery) {
      product.gallery = updateData.gallery;
    }
    if (updateData.features) {
      product.features = JSON.stringify(updateData.features);
    }

    Object.assign(product, updateData);
    return this.productRepository.save(product);
  }

  // async deleteProduct(id: number): Promise<void> {
  //   const result = await this.productRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException("Product not found");
  //   }
  // }


  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
        throw new NotFoundException("Product not found");
    }

    // Xóa ảnh chính
    if (product.image) {
        const imagePath = path.join(__dirname, "../../../uploads", path.basename(product.image));
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Đã xóa ảnh: ${imagePath}`);
        }
    }

    // Xóa tất cả ảnh trong gallery
    if (product.gallery && product.gallery.length > 0) {
        product.gallery.forEach((img) => {
            const imgPath = path.join(__dirname, "../../../uploads", path.basename(img));
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
                console.log(`Đã xóa ảnh trong gallery: ${imgPath}`);
            }
        });
    }

    // Xóa sản phẩm khỏi database
    await this.productRepository.delete(id);
}
}
