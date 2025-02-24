import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { GalleryEntity } from './gallery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryEntity])],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}