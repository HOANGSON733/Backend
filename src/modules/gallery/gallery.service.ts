import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryEntity } from './gallery.entity';
import { CreateGalleryDto, UpdateGalleryDto } from 'src/dto/gallery.dto';

@Injectable()
export class GalleryService {
  constructor(@InjectRepository(GalleryEntity) private galleryRepository: Repository<GalleryEntity>) {}

  async createGallery(galleryDto: CreateGalleryDto): Promise<GalleryEntity> {
    const newItem = this.galleryRepository.create({
      ...galleryDto,
      image: JSON.stringify(galleryDto.image), // Chuyển mảng thành chuỗi JSON
    });
    return this.galleryRepository.save(newItem);
  }

  async getGallery(): Promise<GalleryEntity[]> {
    const items = await this.galleryRepository.find();
    return items.map(({ createSlug, ...rest }) => ({
      ...rest,
      image: JSON.parse(rest.image), // Chuyển chuỗi JSON thành mảng
    })) as GalleryEntity[];
  }

  async updateGallery(id: number, galleryDto: UpdateGalleryDto): Promise<GalleryEntity> {
    const item = await this.galleryRepository.preload({
      id,
      ...galleryDto,
      image: galleryDto.image ? JSON.stringify(galleryDto.image) : undefined,
    });

    if (!item) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }

    return this.galleryRepository.save(item);
  }

  async detailGallery(id: number): Promise<GalleryEntity> {
    const item = await this.galleryRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }

    const { createSlug, ...filteredItem } = item;
    return { ...filteredItem, image: JSON.parse(filteredItem.image) } as GalleryEntity;
  }

  async deleteGallery(id: number) {
    const result = await this.galleryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }

    return { message: 'Gallery deleted successfully' };
  }
}
