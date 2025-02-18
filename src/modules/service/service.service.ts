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
        console.log("Received DTO:", serviceDto); // Log dữ liệu đầu vào
        const newItem = this.serviceRepository.create(serviceDto);
        console.log("Created entity:", newItem); // Log dữ liệu entity được tạo
    
        const savedItem = await this.serviceRepository.save(newItem);
        console.log("Saved entity:", savedItem); // Log dữ liệu sau khi lưu
    
        return savedItem;
    }
    

    async getServices() {
        return this.serviceRepository.find();
    }

    async updateService(id: string, serviceDto: UpdateServiceDto) {  // 🛠 Sửa thành string
    const item = await this.serviceRepository.findOne({ where: { id } });

    if (!item) {
        throw new NotFoundException(`Service with ID ${id} not found`);
    }

    Object.assign(item, serviceDto);
    return this.serviceRepository.save(item);
}


    async getDetail(id: string): Promise<ServiceEntity> {
        const item = await this.serviceRepository.findOne({ where: {id} });
    
        if (!item) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
    
        return item;
    }
    
    async deleteService(id: string): Promise<{ message: string }> {
        const item = await this.serviceRepository.findOne({ where: { id } });
    
        if (!item) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
    
        await this.serviceRepository.delete(id);
        return { message: `Service with ID ${id} has been deleted` };
    }
    

}
