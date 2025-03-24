import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { blogModule } from './modules/blog/blog.module';
import { serviceModule } from './modules/service/service.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { Banner } from './modules/banner/banner.entity';

@Module({
  imports: [
    GalleryModule,
    serviceModule,
    ProductModule,
    blogModule,
    Banner,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: false, // Tắt để tránh mất dữ liệu
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}