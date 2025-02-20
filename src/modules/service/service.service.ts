import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ServiceEntity } from "./service.entity";
import { CreateServiceDto } from "src/dto/service.dto";
import { Repository } from "typeorm";
import { UpdateServiceDto } from "src/dto/service.dto"; // Đổi DTO đúng

@Injectable()
export class ServiceService {
    constructor(@InjectRepository(ServiceEntity) private serviceRepository: Repository<ServiceEntity>) { }
    async createService(serviceDto: CreateServiceDto) {
        console.log("Service DTO nhận được:", serviceDto); // Debug

        const newItem = this.serviceRepository.create(serviceDto);
        console.log("Dữ liệu trước khi lưu:", newItem); // Debug

        const savedItem = await this.serviceRepository.save(newItem);
        console.log("Dữ liệu đã lưu:", savedItem); // Debug

        return savedItem;
    }


    async getServices() {
        return this.serviceRepository.find();
    }

    async updateService(id: number, serviceDto: UpdateServiceDto) {
        const item = await this.serviceRepository.findOne({ where: { id } });

        if (!item) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }

        Object.assign(item, serviceDto);
        return this.serviceRepository.save(item);
    }


    async getDetail(id: number): Promise<ServiceEntity> {
        const item = await this.serviceRepository.findOne({ where: { id } });

        if (!item) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }

        return item;
    }

    async deleteService(id: number): Promise<{ message: string }> {
        const item = await this.serviceRepository.findOne({ where: { id } });

        if (!item) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }

        await this.serviceRepository.delete(id);
        return { message: `Service with ID ${id} has been deleted` };
    }


}
