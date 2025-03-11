import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServiceEntity } from "./service.entity";
import { CreateServiceDto, UpdateServiceDto } from "src/dto/service.dto";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class ServiceService {
    private readonly logger = new Logger(ServiceService.name);
    private readonly BASE_URL = "http://localhost:5000/uploads/";

    constructor(@InjectRepository(ServiceEntity) private serviceRepository: Repository<ServiceEntity>) {}

    async createService(data: CreateServiceDto) {
        this.logger.debug("Creating new service with data: " + JSON.stringify(data));
        console.log("Dữ liệu dịch vụ1:", data);
        
        // Đảm bảo chỉ giữ tối đa 2 hình ảnh
        const images = data.image && data.image.length > 0 ? data.image.slice(0, 2) : [];

        const newItem = this.serviceRepository.create({
            ...data,
            image: images,
        });

        return await this.serviceRepository.save(newItem);
    }

    async getServices() {
        const services = await this.serviceRepository.find();
        console.log("Danh sách dịch vụ:", services);
        return services;
    }

    async getDetail(id: number): Promise<ServiceEntity> {
        return this.findServiceOrFail(id);
    }

    async updateService(id: number, serviceDto: UpdateServiceDto) {
        const item = await this.findServiceOrFail(id);

        if (serviceDto.image && serviceDto.image.length > 0) {
            // Xóa hình ảnh cũ trước khi cập nhật
            this.deleteImageFiles(item.image);
            item.image = serviceDto.image.slice(0, 2); // Giữ tối đa 2 ảnh mới
        }

        Object.assign(item, serviceDto);
        return this.serviceRepository.save(item);
    }

    async deleteService(id: number): Promise<{ message: string }> {
        const item = await this.findServiceOrFail(id);

        this.deleteImageFiles(item.image); // Xóa tất cả ảnh nếu có

        await this.serviceRepository.delete(id);
        return { message: `Service with ID ${id} has been deleted` };
    }

    private async findServiceOrFail(id: number): Promise<ServiceEntity> {
        const item = await this.serviceRepository.findOne({ where: { id } });
        if (!item) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
        return item;
    }

    private deleteImageFiles(imageUrls?: string[]) {
        if (!imageUrls || imageUrls.length === 0) return;

        imageUrls.forEach((imageUrl) => {
            const fileName = path.basename(imageUrl);
            const filePath = path.join(__dirname, "../../../uploads", fileName);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                this.logger.log(`Deleted image: ${filePath}`);
            } else {
                this.logger.warn(`Image not found: ${filePath}`);
            }
        });
    }
}
