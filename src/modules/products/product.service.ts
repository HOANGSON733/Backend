import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "src/dto/product.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) { }
  async createProduct(productDto: CreateProductDto) {
    console.log("Dữ liệu nhận được:", productDto); // Kiểm tra dữ liệu đầu vào

    const newItem = this.productRepository.create({
      ...productDto,
      gallery: JSON.stringify(productDto.gallery ?? []), // Chuyển thành JSON string
      features: JSON.stringify(productDto.features ?? []), // Chuyển thành JSON string
    });
    await this.productRepository.save(newItem);
    console.log("Dữ liệu sau khi create:", newItem); // Kiểm tra dữ liệu đã khởi tạo

    const saveItem = await this.productRepository.save(newItem);
    console.log("Dữ liệu sau khi lưu:", saveItem);

    return saveItem;
  }

  async getProducts() {
    return this.productRepository.find();
  }



  async getProductDetail(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    return {
      ...product,
      gallery: JSON.parse(product.gallery || "[]"), // Chuyển JSON string về mảng
      features: JSON.parse(product.features || "[]"),
    };
  }



  async updateProduct(id: number, updateData: Partial<CreateProductDto>) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    // Cập nhật dữ liệu
    const updatedProduct = this.productRepository.merge(product, {
      ...updateData,
      gallery: updateData.gallery ? JSON.stringify(updateData.gallery) : product.gallery,
      features: updateData.features ? JSON.stringify(updateData.features) : product.features,
    });

    await this.productRepository.save(updatedProduct);
    console.log("Dữ liệu sau khi cập nhật:", updatedProduct);

    return {
      ...updatedProduct,
      gallery: JSON.parse(updatedProduct.gallery || "[]"), // Chuyển JSON string về mảng
      features: JSON.parse(updatedProduct.features || "[]"),
    };
  }


  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    await this.productRepository.delete(id);
    console.log(`Đã xóa sản phẩm có ID: ${id}`);

    return { message: "Xóa sản phẩm thành công", id };
  }


}