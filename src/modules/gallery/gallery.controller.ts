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
    UseInterceptors
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
    @UseInterceptors(FileInterceptor('image',
        {
            storage: diskStorage({
                destination: "./uploads",
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }))
    async createGallary(@Body() gallaryDto: CreateGalleryDto): Promise<ResponseData<GalleryEntity>> {
        console.log("gallaryDto", gallaryDto);

        try {
            const newItem = await this.galleryService.createGallery(gallaryDto)
            return new ResponseData<GalleryEntity>(newItem, HttpStatus.SUCCESS, HttpMessager.SUCCESS)
        } catch (error) {
            return new ResponseData<GalleryEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR)
        }
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


    @Patch("/:id")
    async UpdateGallery(@Body() galleryDto: UpdateGalleryDto, @Param("id") id: number): Promise<ResponseData<GalleryEntity>> {
        try {
            const item = await this.galleryService.UpdateGallery(id, galleryDto)
            return new ResponseData<GalleryEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS)
        } catch (error) {
            return new ResponseData<GalleryEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR)

        }
    }

}