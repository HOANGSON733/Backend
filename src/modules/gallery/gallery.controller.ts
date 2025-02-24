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
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessager, HttpStatus } from 'src/global/globalEnum';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto, UpdateGalleryDto } from 'src/dto/gallery.dto';
import { GalleryEntity } from './gallery.entity';

@Controller('gallary')
export class GalleryController {
    constructor(private readonly gallaryservice: GalleryService) { }

    @Post()
    async createGallary(@Body() gallaryDto: CreateGalleryDto): Promise<ResponseData<GalleryEntity>> {
        try {
            const newItem = await this.gallaryservice.createGallery(gallaryDto)
            return new ResponseData<GalleryEntity>(newItem, HttpStatus.SUCCESS, HttpMessager.SUCCESS)
        } catch (error) {
            return new ResponseData<GalleryEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR)
        }
    }

    @Get()
    async getGallarys(): Promise<ResponseData<GalleryEntity>> {
        try {
            const items = await this.gallaryservice.getGallery()
            return new ResponseData<GalleryEntity>(items, HttpStatus.SUCCESS, HttpMessager.SUCCESS)
        } catch (error) {
            return new ResponseData<GalleryEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR)
        }
    }
   
    @Patch("/:id")
    async updateGallary(@Body() gallaryDto: UpdateGalleryDto, @Param("id") id: number): Promise<ResponseData<GalleryEntity>> {
        try {
            const item = await this.gallaryservice.updateGallery(id, gallaryDto)
            return new ResponseData<GalleryEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS)
        } catch (error) {
            return new ResponseData<GalleryEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR)
        }
    }

    @Get("/:id")
    async detailGallary(@Param("id", ParseIntPipe) id: number): Promise<ResponseData<GalleryEntity>> {
        try {
            const item = await this.gallaryservice.detailGallery(id);
            return new ResponseData<GalleryEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<GalleryEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
        }
    }

    @Delete("/:id")
    async deleteGallary(@Param("id", ParseIntPipe) id: number): Promise<ResponseData<null>> {
        try {
            await this.gallaryservice.deleteGallery(id);
            return new ResponseData<null>(null, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<null>(null, HttpStatus.ERROR, HttpMessager.ERROR);
        }
    }


}