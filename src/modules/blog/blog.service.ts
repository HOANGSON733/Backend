
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto, UpdateBlogDto } from 'src/dto/blog.dto';


@Injectable()
export class BlogService {
  constructor(@InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>) { }
  async createBlog(blogDto: CreateBlogDto) {
    const newItem = await this.blogRepository.create(blogDto);
    console.log("blog", newItem);

    return this.blogRepository.save(newItem)
  }

  async getBlogs() {
    const items = await this.blogRepository.find()
    return items
  }

  async updateBlog(id: number, blogDto: UpdateBlogDto) {
    const item = await this.blogRepository.findOne({ where: { id } })
    const itemUpdate = {
      ...item,
      ...blogDto
    }
    return this.blogRepository.save(itemUpdate, { reload: true });
  }
}
