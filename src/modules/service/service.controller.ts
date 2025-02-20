import { Body, Controller, Get, Patch, Post, Param, Delete } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { CreateServiceDto } from "src/dto/service.dto";
import { ResponseData } from "src/global/globalClass";
import { ServiceEntity } from "./service.entity";
import { HttpMessager, HttpStatus } from 'src/global/globalEnum';

@Controller('services')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post()
    async createService(@Body() serviceDto: CreateServiceDto): Promise<ResponseData<ServiceEntity>> {
        console.log("Received body:", serviceDto); // In ra body nhận được
        try {
            const newItem = await this.serviceService.createService(serviceDto);
            return new ResponseData<ServiceEntity>(newItem, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<ServiceEntity>(null, HttpStatus.ERROR, error.message || HttpMessager.ERROR);
        }
    }


    @Get()
    async getServices(): Promise<ResponseData<ServiceEntity[]>> {   
        try {
            const items = await this.serviceService.getServices();
            return new ResponseData<ServiceEntity[]>(items, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<ServiceEntity[]>(null, HttpStatus.ERROR, HttpMessager.ERROR);
        }
    }

    @Patch("/:id")
    async updateService(
        @Param('id') id: number,
        @Body() updateData: Partial<CreateServiceDto>
    ): Promise<ResponseData<ServiceEntity>> {
        try {
            const updatedItem = await this.serviceService.updateService(id, updateData);
            return new ResponseData<ServiceEntity>(updatedItem, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<ServiceEntity>(null, HttpStatus.ERROR, HttpMessager.ERROR);
        }
    }

    @Get("/:id")
    async getServiceDetail(@Param('id') id: number): Promise<ResponseData<ServiceEntity>> {
        try {
            const item = await this.serviceService.getDetail((id));
            return new ResponseData<ServiceEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<ServiceEntity>(null, HttpStatus.ERROR, error.message || HttpMessager.ERROR);
        }
    }


    @Delete("/:id")
    async deleteService(@Param('id') id: number): Promise<ResponseData<null>> {
        try {
            const result = await this.serviceService.deleteService(Number(id));
            return new ResponseData<null>(null, HttpStatus.SUCCESS, result.message);
        } catch (error) {
            return new ResponseData<null>(null, HttpStatus.ERROR, error.message || HttpMessager.ERROR);
        }
    }

}
