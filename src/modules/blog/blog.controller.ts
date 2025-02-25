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
import { BlogService } from './blog.service';
import { BlogEntity } from './blog.entity';
import { CreateBlogDto, UpdateBlogDto } from 'src/dto/blog.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessager, HttpStatus } from 'src/global/globalEnum';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogservice: BlogService) { }

  @Post()
  async createBlog(@Body() blogDto: CreateBlogDto): Promise<ResponseData<BlogEntity>> {
    try {
      const newItem = await this.blogservice.createBlog(blogDto)
      return new ResponseData<BlogEntity>(newItem, HttpStatus.SUCCESS, HttpMessager.SUCCESS)
    } catch (error) {
      return new ResponseData<BlogEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR)
    }
  }

  @Get()
  async getBlogs(): Promise<ResponseData<BlogEntity>> {
    try {
      const items = await this.blogservice.getBlogs()
      return new ResponseData<BlogEntity>(items, HttpStatus.SUCCESS, HttpMessager.SUCCESS)
    } catch (error) {
      return new ResponseData<BlogEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR)
    }
  }

  @Patch("/:id")
  async updateBlog(@Body() blogDto: UpdateBlogDto , @Param("id") id: number): Promise<ResponseData<BlogEntity>> {
    try {
      const item = await this.blogservice.updateBlog(id,blogDto)
      return new ResponseData<BlogEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS)
    } catch (error) {
      return new ResponseData<BlogEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR)
    }
  }

  @Get("/:id")
  async detailBlog(@Param("id", ParseIntPipe) id: number): Promise<ResponseData<BlogEntity>> {
    try {
      const item = await this.blogservice.detailBlog(id);
      return new ResponseData<BlogEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<BlogEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  @Delete("/:id")
  async deleteBlog(@Param("id", ParseIntPipe) id: number): Promise<ResponseData<null>> {
    try {
      await this.blogservice.deleteBlog(id);
      return new ResponseData<null>(null, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
    } catch (error) {
      return new ResponseData<null>(null, HttpStatus.ERROR, HttpMessager.ERROR);
    }
  }

  
}