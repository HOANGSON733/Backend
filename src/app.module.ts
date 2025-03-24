import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { blogModule } from './modules/blog/blog.module';
import { serviceModule } from './modules/service/service.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { BannerModule } from './modules/banner/banner.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load biến môi trường từ Render
    GalleryModule,
    serviceModule,
    ProductModule,
    blogModule,
    BannerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get<string>('DATABASE_URL'), // Lấy DATABASE_URL từ môi trường
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}