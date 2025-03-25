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
  UploadedFile,
  NotFoundException
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerEntity } from './banner.entity';
import { CreateBannerDto, UpdateBannerDto } from 'src/dto/banner.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessager, HttpStatus } from 'src/global/globalEnum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

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
  async createBanner(@Body() data: CreateBannerDto, @UploadedFile() file: Express.Multer.File): Promise<ResponseData<BannerEntity>> {
    try {
      const newItem = await this.bannerService.createBanner(data, file);
      return new ResponseData<BannerEntity>(newItem, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<BannerEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Get()
  async getBanners(): Promise<ResponseData<BannerEntity[]>> {
    try {
      const items = await this.bannerService.getBanners();
      return new ResponseData<BannerEntity[]>(items, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<BannerEntity[]>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Get('/:id')
  async detailBanner(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<BannerEntity>> {
    try {
      const item = await this.bannerService.detailBanner(id);
      if (!item) throw new NotFoundException("Banner not found");
      return new ResponseData<BannerEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<BannerEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Patch('/:id')
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
  async updateBanner(
    @Param('id', ParseIntPipe) id: number,
    @Body() bannerDto: UpdateBannerDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<ResponseData<BannerEntity>> {
    try {
      const existingBanner = await this.bannerService.detailBanner(id);
      if (!existingBanner) throw new NotFoundException("Banner not found");

      if (file) {
        bannerDto.image = `http://localhost:5000/uploads/${file.filename}`;
      }
      const item = await this.bannerService.updateBanner(id, bannerDto);
      return new ResponseData<BannerEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<BannerEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Delete('/:id')
  async deleteBanner(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<null>> {
    try {
      const existingBanner = await this.bannerService.detailBanner(id);
      if (!existingBanner) throw new NotFoundException("Banner not found");

      await this.bannerService.deleteBanner(id);
      return new ResponseData<null>(null, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<null>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }
}
