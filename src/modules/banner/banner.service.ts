import * as fs from 'fs/promises';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BannerEntity } from './banner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBannerDto, UpdateBannerDto } from 'src/dto/banner.dto';

@Injectable()
export class BannerService {
  constructor(@InjectRepository(BannerEntity) private BannerRepository: Repository<BannerEntity>) {}

  async createBanner(data, file: Express.Multer.File) {
    const BASE_URL = "http://localhost:5000/uploads/";
    const newBanner = this.BannerRepository.create({
      ...data,
      image: file ? BASE_URL + file.filename : null,
    });
    return await this.BannerRepository.save(newBanner);
  }

  async getBanners() {
    return await this.BannerRepository.find();
  }

  async detailBanner(id: number) {
    const item = await this.BannerRepository.findOne({ where: { id } });
    if (!item) {
      return null;
    }
    return item;
  }

  async updateBanner(id: number, bannerDto: UpdateBannerDto, file?: Express.Multer.File) {
    const item = await this.BannerRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error(`Banner với ID ${id} không tồn tại!`);
    }
  
    // Chỉ xóa ảnh cũ khi có file mới được tải lên
    if (file && item.image) {
      const oldImageUrl = item.image;
      const fileName = path.basename(oldImageUrl);
      const filePath = path.join(__dirname, '../../../uploads', fileName);
      
      try {
        await fs.unlink(filePath);
        console.log(`Đã xóa ảnh cũ: ${filePath}`);
      } catch (error) {
        if (error.code !== 'ENOENT') {
          console.error(`Lỗi khi xóa ảnh: ${error.message}`);
        } else {
          console.warn(`Không tìm thấy ảnh cũ tại đường dẫn: ${filePath}`);
        }
      }
      
      // Cập nhật đường dẫn ảnh mới
      bannerDto.image = `http://localhost:5000/uploads/${file.filename}`;
    }
  
    // Cập nhật thông tin banner
    const itemUpdate = this.BannerRepository.create({
      ...item,
      ...bannerDto,
    });
    
    return this.BannerRepository.save(itemUpdate);
  }

  async deleteBanner(id: number) {
    const item = await this.BannerRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error("banner not found");
    }

    if (item.image) {
      const fileName = path.basename(item.image);
      const filePath = path.join(__dirname, '../../../uploads', fileName);
      try {
        await fs.unlink(filePath);
        console.log(`Đã xóa ảnh: ${filePath}`);
      } catch (error) {
        if (error.code !== 'ENOENT') {
          console.error(`Lỗi khi xóa ảnh: ${error.message}`);
        }
      }
    }

    await this.BannerRepository.delete(id);
    return { message: 'Banner deleted successfully' };
  }
}
