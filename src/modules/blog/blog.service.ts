import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto, UpdateBlogDto } from 'src/dto/blog.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>) {}

  async createBlog(data, file: Express.Multer.File) {
    const BASE_URL = "http://localhost:5000/uploads/";
    const newBlog = this.blogRepository.create({
      ...data,
      image: file ? BASE_URL + file.filename : null,
    });
    return await this.blogRepository.save(newBlog);
  }

  async getBlogs() {
    return await this.blogRepository.find();
  }

  async detailBlog(id: number) {
    const item = await this.blogRepository.findOne({ where: { id } });
    if (!item) {
      return null; // Trả về null thay vì throw lỗi
    }
    return item;
  }

  async updateBlog(id: number, blogDto: UpdateBlogDto) {
    const item = await this.blogRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error(`Blog với ID ${id} không tồn tại!`);
    }

    const itemUpdate = this.blogRepository.create({
      ...item,
      ...blogDto,
      image: Array.isArray(blogDto.image) ? blogDto.image.join(",") : blogDto.image,
    });

    return this.blogRepository.save(itemUpdate);
  }

  async deleteBlog(id: number) {
    const item = await this.blogRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error("Blog not found");
    }

    if (item.image) {
      const fileName = path.basename(item.image);
      const filePath = path.join(__dirname, '../../../uploads', fileName);

      console.log(`Đang xóa ảnh: ${filePath}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Đã xóa ảnh: ${filePath}`);
      } else {
        console.log(`Không tìm thấy ảnh: ${filePath}`);
      }
    }

    await this.blogRepository.delete(id);
    return { message: 'Blog deleted successfully' };
  }
}
