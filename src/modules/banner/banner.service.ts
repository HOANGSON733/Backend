// banner.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Banner } from "./banner.entity";
import { CreateBannerDto } from "src/dto/banner.dto";

@Injectable()
export class BannerService {
  createBanner(bannerDto: CreateBannerDto) {
      throw new Error("Method not implemented.");
  }
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>
  ) {}

  async create(createBannerDto: CreateBannerDto): Promise<Banner> {
    const newBanner = this.bannerRepository.create(createBannerDto);
    return this.bannerRepository.save(newBanner);
  }

  async findAll(): Promise<Banner[]> {
    return this.bannerRepository.find();
  }

  async findOne(id: number): Promise<Banner |null> {
    return this.bannerRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.bannerRepository.delete(id);
  }
}