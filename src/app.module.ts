import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { blogModule } from './modules/blog/blog.module';
import { serviceModule } from './modules/service/service.module';
import { GalleryModule } from './modules/gallery/gallery.module';

@Module({
  imports: [GalleryModule,serviceModule, ProductModule, blogModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [
        __dirname + '/**/*.entity{.ts,.js}',
    ],
    synchronize: true,
    dropSchema: true,
  })],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
