import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryEntity } from './gallery.entity';
import { CreateGalleryDto, UpdateGalleryDto } from 'src/dto/gallery.dto';

@Injectable()
export class GalleryService {
    constructor(@InjectRepository(GalleryEntity) private galleryRepository: Repository<GalleryEntity>) { }
    async createGallery(data, file: Express.Multer.File) {
        const BASE_URL = "http://localhost:5000/uploads/";
        const newGallery = this.galleryRepository.create({
            ...data,
            image: file ? BASE_URL + file.filename : null, 
        });
        return await this.galleryRepository.save(newGallery);
    }
    


    async GetGallery() {
        const items = await this.galleryRepository.find()
        return items;
    }

    async GetDetailGallery(id: number) {
        const item = await this.galleryRepository.findOne({ where: { id } });
        if (!item) {
            throw new Error("Lỗi detail....")
        }
        return item;
    }

    async DeleteGallery(id: number) {
        const item = await this.galleryRepository.findOne({ where: { id } });
        if (!item) {
            throw new Error("Blog Not Bad")
        }
        await this.galleryRepository.delete(id);
        return { message: "Đã Xóa !!!!" }
    }

    async UpdateGallery(id: number, galleryDto: UpdateGalleryDto) {
        const item = await this.galleryRepository.findOne({ where: { id } });
    
        if (!item) {
            throw new Error(`Gallery với ID ${id} không tồn tại!`); // 🚨 Thông báo lỗi nếu không tìm thấy entity
        }
    
        const itemUpdate = this.galleryRepository.create({
            ...item,
            ...galleryDto,
            image: Array.isArray(galleryDto.image) ? galleryDto.image.join(",") : galleryDto.image, // ✅ Chuyển về string nếu là mảng
        });
        
    
        return this.galleryRepository.save(itemUpdate); // ✅ Đảm bảo lưu đúng entity
    }
    
}
