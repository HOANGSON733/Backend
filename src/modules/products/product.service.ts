import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getProducts(): string {
    return 'GET PRODUCT LIST';
  }

  createProducts(): string {
    return 'POST PRODUCT';
  }

  detaiProduct(): string {
    return 'GET PRODUCT DETAIL';
  }

  updateProduct(): string {
    return 'UPDATE PRODUCT';
  }

  deleteProduct(): string {
    return 'DELETE PRODUCT1';
  }
}
