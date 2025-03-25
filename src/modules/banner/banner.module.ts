// banner.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BannerService } from "./banner.service";
import { BannerController } from "./banner.controller";
import { BannerEntity } from "./banner.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity])],
  controllers: [BannerController],
  providers: [BannerService],
  exports: [TypeOrmModule], // Xuất để sử dụng trong AppModule
})
export class BannerModule {}
export { BannerEntity };

