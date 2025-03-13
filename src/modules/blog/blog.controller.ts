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
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogEntity } from './blog.entity';
import { CreateBlogDto, UpdateBlogDto } from 'src/dto/blog.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessager, HttpStatus } from 'src/global/globalEnum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

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
  async createBlog(@Body() data: CreateBlogDto, @UploadedFile() file: Express.Multer.File): Promise<ResponseData<BlogEntity>> {
    try {
      const newItem = await this.blogService.createBlog(data, file);
      return new ResponseData<BlogEntity>(newItem, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<BlogEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Get()
  async getBlogs(): Promise<ResponseData<BlogEntity>> {
    try {
      const items = await this.blogService.getBlogs();
      return new ResponseData<BlogEntity>(items, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<BlogEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Get('/:id')
  async detailBlog(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<BlogEntity>> {
    try {
      const item = await this.blogService.detailBlog(id);
      if (!item) throw new NotFoundException("Blog not found");
      return new ResponseData<BlogEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<BlogEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
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
  async updateBlog(
    @Param('id', ParseIntPipe) id: number,
    @Body() blogDto: UpdateBlogDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<ResponseData<BlogEntity>> {
    try {
      const existingBlog = await this.blogService.detailBlog(id);
      if (!existingBlog) throw new NotFoundException("Blog not found");

      if (file) {
        blogDto.image = `http://localhost:5000/uploads/${file.filename}`;
      }
      const item = await this.blogService.updateBlog(id, blogDto);
      return new ResponseData<BlogEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<BlogEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Delete('/:id')
  async deleteBlog(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<null>> {
    try {
      const existingBlog = await this.blogService.detailBlog(id);
      if (!existingBlog) throw new NotFoundException("Blog not found");

      await this.blogService.deleteBlog(id);
      return new ResponseData<null>(null, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<null>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }
}
