import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServiceEntity } from "./service.entity";
import { CreateServiceDto, UpdateServiceDto } from "src/dto/service.dto";

@Injectable()
export class ServiceService {
    private readonly logger = new Logger(ServiceService.name);

    constructor(@InjectRepository(ServiceEntity) private serviceRepository: Repository<ServiceEntity>) {}

    async createService(serviceDto: CreateServiceDto) {
        this.logger.debug("Creating new service with data: ", serviceDto);

        const newItem = this.serviceRepository.create(serviceDto);
        const savedItem = await this.serviceRepository.save(newItem);

        return savedItem;
    }

    async getServices() {
        return this.serviceRepository.find();
    }

    async getDetail(id: number): Promise<ServiceEntity> {
        return this.findServiceOrFail(id);
    }

    async updateService(id: number, serviceDto: UpdateServiceDto) {
        const item = await this.findServiceOrFail(id);

        if (Object.keys(serviceDto).length === 0) {
            return item; // Không cập nhật nếu DTO rỗng
        }

        Object.assign(item, serviceDto);
        return this.serviceRepository.save(item);
    }

    async deleteService(id: number): Promise<{ message: string }> {
        await this.findServiceOrFail(id);
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
}
