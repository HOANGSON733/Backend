import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { Product } from 'src/models/product.models';

@Injectable()
export class ProductService {
  private products: Product[] = [
    { id: 1, categoryId: 2, productName: 'KeyBoard', price: 80000 },
    { id: 2, categoryId: 3, productName: 'Case', price: 800000 },
    { id: 3, categoryId: 4, productName: 'KKKK', price: 90000 },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  createProducts(productDto: ProductDto): Product {
    const product: Product = {
      id: Math.random(),
      ...productDto,
    };
    this.products.push(product);
    return product;
  }

  detaiProduct(id: number): Product {
    return this.products.find((item) => item.id === Number(id))!;
  }

  updateProduct(productDto: ProductDto, id: number): Product {
    const index = this.products.findIndex((item) => item.id === Number(id));
    this.products[index].categoryId = productDto.categoryId;
    this.products[index].productName = productDto.productName;
    this.products[index].price = productDto.price;
    return this.products[index];
  }

  deleteProduct(id: number): boolean {
    const index = this.products.findIndex((item) => item.id === Number(id));
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}
