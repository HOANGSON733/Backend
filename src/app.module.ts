import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { blogModule } from './modules/blog/blog.module';
import { serviceModule } from './modules/service/service.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { BannerModule } from './modules/banner/banner.module';

@Module({
  imports: [
    GalleryModule,
    serviceModule,
    ProductModule,
    blogModule,
    BannerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
