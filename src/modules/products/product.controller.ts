import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  UploadedFile
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "src/dto/product.dto";
import { ResponseData } from "src/global/globalClass";
import { ProductEntity } from "./product.entity";
import { HttpMessager, HttpStatus } from "src/global/globalEnum";
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async createProduct(
    @Body() productDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<ResponseData<ProductEntity>> {
    try {
      console.log("Received data1:", productDto);
      console.log("Files nhận được:", files);

      // Lọc file theo fieldname
      const imageFile = files.find(f => f.fieldname === "image");
      const galleryFiles = files.filter(f => f.fieldname === "gallery");

      if (imageFile) {
        productDto.image = `http://localhost:5000/uploads/${imageFile.filename}`;
      }
      if (galleryFiles.length > 0) {
        productDto.gallery = galleryFiles.map(f => `http://localhost:5000/uploads/${f.filename}`);
      }

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

  @Get(":id")
  async getProductDetail(@Param("id", ParseIntPipe) id: number): Promise<ResponseData<ProductEntity>> {
    try {
      const item = await this.productService.getProductById(id); // Sửa lỗi gọi dữ liệu từ DB
      if (!item) throw new BadRequestException("Product not found");

      return new ResponseData<ProductEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Patch(":id")
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async updateProduct(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateProductDto>,
    @UploadedFiles() files?: Express.Multer.File[]
  ): Promise<ResponseData<ProductEntity>> {
    try {
      console.log("Received update request for product ID:", id, "with data:", updateData);
      const product = await this.productService.getProductById(id);
      if (!product) {
        console.error("Product not found with ID:", id);
        return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, "Product not found");
      }

      console.log("Existing product data:", product);
      
      const imageFile = files?.find(f => f.fieldname === "image");
      const galleryFiles = files?.filter(f => f.fieldname === "gallery");

      updateData.image = imageFile
        ? `http://localhost:5000/uploads/${imageFile.filename}`
        : product.image ?? undefined;

      updateData.gallery = galleryFiles && galleryFiles.length > 0
        ? galleryFiles.map(f => `http://localhost:5000/uploads/${f.filename}`)
        : product.gallery ?? [];

      console.log("Updated product data:", updateData);
      const updatedProduct = await this.productService.updateProduct(id, updateData);
      console.log("Product updated successfully", updatedProduct);
      return new ResponseData<ProductEntity>(updatedProduct, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      console.error("Error updating product", error);
      return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Delete(":id")
  async deleteProduct(@Param("id", ParseIntPipe) id: number): Promise<ResponseData<null>> {
    try {
      await this.productService.deleteProduct(id);
      return new ResponseData<null>(null, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<null>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }
}
