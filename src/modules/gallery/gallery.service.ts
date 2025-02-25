import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryEntity } from './gallery.entity';
import { CreateGalleryDto, UpdateGalleryDto } from 'src/dto/gallery.dto';

@Injectable()
export class GalleryService {
    constructor(@InjectRepository(GalleryEntity) private galleryRepository: Repository<GalleryEntity>) { }

    async createGallery(gallaryDto: CreateGalleryDto) {
        const newItem = this.galleryRepository.create(gallaryDto);
        console.log("blog", newItem);
        return this.galleryRepository.save(newItem)
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

    async UpdateGallery(id: number,gallaryDto:UpdateGalleryDto){
        const item = await this.galleryRepository.findOne({where:{id}});
        const itemUpdate = {
            ...item,
            ...gallaryDto
        }
        return this.galleryRepository.save(itemUpdate, {reload:true})
    }
}
