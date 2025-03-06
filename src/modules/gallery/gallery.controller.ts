import {
    Controller,
    Delete,
    Get,
    Post,
    Patch,
    Param,
    Body,
    ParseIntPipe,
    ValidationPipe,
    Req,
    UseInterceptors,
    UploadedFile,
    BadRequestException
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessager, HttpStatus } from 'src/global/globalEnum';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto, UpdateGalleryDto } from 'src/dto/gallery.dto';
import { GalleryEntity } from './gallery.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${uniqueSuffix}${ext}`);
            },
        }),
    }))
    async createGallery(
        @Body() data,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.galleryService.createGallery(data, file);
    }


    @Get()
    async GetGallery(): Promise<ResponseData<GalleryEntity>> {
        try {
            const items = await this.galleryService.GetGallery()
            return new ResponseData<GalleryEntity>(items, HttpStatus.SUCCESS, HttpMessager.SUCCESS);

        } catch (error) {
            const items = await this.galleryService.GetGallery()
            return new ResponseData<GalleryEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);

        }
    }

    @Get("/:id")
    async GetDetail(@Param("id", ParseIntPipe) id: number): Promise<ResponseData<GalleryEntity>> {
        try {
            const item = await this.galleryService.GetDetailGallery(id);
            return new ResponseData<GalleryEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS)
        } catch (error) {
            return new ResponseData<GalleryEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR)
        }
    }

    @Delete("/:id")
    async DeleteGallery(@Param("id", ParseIntPipe) id: number): Promise<ResponseData<null>> {
        try {
            await this.galleryService.DeleteGallery(id);
            return new ResponseData<null>(null, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<null>(null, HttpStatus.ERROR, HttpMessager.ERROR);
        }
    }

    @Post("upload")
    @UseInterceptors(FileInterceptor("image", {
        storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${uniqueSuffix}${ext}`);
            },
        }),
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log("File nhận được từ client:", file); // Kiểm tra file nhận được

        if (!file) {
            throw new BadRequestException("Không có file nào được tải lên");
        }

        // Xử lý đường dẫn ảnh
        const fileUrl = `http://localhost:5000/uploads/${file.filename}`;
        console.log("Đường dẫn ảnh:", fileUrl);

        return { url: fileUrl };
    }




    @Patch("/:id")
    @UseInterceptors(FileInterceptor("image", {
        storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${uniqueSuffix}${ext}`);
            },
        }),
    }))
    async UpdateGallery(
        @Param("id", ParseIntPipe) id: number,
        @Body() galleryDto: UpdateGalleryDto,
        @UploadedFile() file?: Express.Multer.File // Nhận file từ request
    ): Promise<ResponseData<GalleryEntity>> {
        console.log("File nhận được từ client:", file ? file.filename : "Không có file"); 
        console.log("Body nhận được:", galleryDto); 
    
        try {
            if (file) {
                galleryDto.image = [`http://localhost:5000/uploads/${file.filename}`]; 
            }
    
            const item = await this.galleryService.UpdateGallery(id, galleryDto);
            return new ResponseData<GalleryEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            return new ResponseData<GalleryEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
        }
    }
    
}