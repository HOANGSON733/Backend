import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Body,
    UseInterceptors,
    UploadedFile,
    ParseIntPipe
  } from "@nestjs/common";
  import { BannerService } from "./banner.service";
  import { CreateBannerDto } from "src/dto/banner.dto";
  import { FileInterceptor } from "@nestjs/platform-express";
  import { diskStorage } from "multer";
  import { extname } from "path";
  
  @Controller("banners")
  export class BannerController {
    constructor(private readonly bannerService: BannerService) {}
  
    // Create banner endpoint
    @Post()
    @UseInterceptors(FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith("image/")) {
          return callback(new Error("Only image files are allowed"), false);
        }
        callback(null, true);
      }
    }))
    async createBanner(
      @Body() bannerDto: CreateBannerDto,
      @UploadedFile() file: Express.Multer.File
    ) {
      if (file) {
        bannerDto.image = `http://localhost:5000/uploads/${file.filename}`;
      }
      // Use the 'create' method from your service instead of 'createBanner'
      return this.bannerService.create(bannerDto);
    }
  
    // Get all banners endpoint
    @Get()
    async getAllBanners() {
      // Use the 'findAll' method from your service
      return this.bannerService.findAll();
    }
  
    // Get banner by ID endpoint
    @Get(":id")
    async getBannerById(@Param("id", ParseIntPipe) id: number) {
      // Use the 'findOne' method from your service
      return this.bannerService.findOne(id);
    }
  
    // Update banner endpoint
    @Patch(":id")
    @UseInterceptors(FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith("image/")) {
          return callback(new Error("Only image files are allowed"), false);
        }
        callback(null, true);
      }
    }))
    async updateBanner(
      @Param("id", ParseIntPipe) id: number,
      @Body() updateBannerDto: CreateBannerDto,
      @UploadedFile() file: Express.Multer.File
    ) {
      // First find the existing banner
      const existingBanner = await this.bannerService.findOne(id);
      
      if (!existingBanner) {
        throw new Error(`Banner with ID ${id} not found`);
      }
      
      // Update the fields from the DTO
      const updatedBanner = { ...existingBanner, ...updateBannerDto };
      
      // Update the image if a new one was uploaded
      if (file) {
        updatedBanner.image = `http://localhost:5000/uploads/${file.filename}`;
      }
      
      // Save the updated banner
      return this.bannerService.create(updatedBanner);
    }
  
    // Delete banner endpoint
    @Delete(":id")
    async deleteBanner(@Param("id", ParseIntPipe) id: number) {
      // Use the 'remove' method from your service
      return this.bannerService.remove(id);
    }
  }