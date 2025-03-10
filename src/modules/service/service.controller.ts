import {
    Controller,
    Delete,
    Get,
    Post,
    Patch,
    Param,
    Body,
    ParseIntPipe,
    ValidationPipe,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    UploadedFiles
} from "@nestjs/common";
import { ResponseData } from "src/global/globalClass";
import { HttpMessager, HttpStatus } from "src/global/globalEnum";
import { ServiceService } from "./service.service";
import { CreateServiceDto, UpdateServiceDto } from "src/dto/service.dto";
import { ServiceEntity } from "./service.entity";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("services")
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post()
    @UseInterceptors(
        FilesInterceptor('image', 2, {
            storage: diskStorage({
                destination: "./uploads",
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueSuffix + extname(file.originalname));
                },
            }),
        })
    )
    async createService(
        @Body() serviceDto: CreateServiceDto,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        const imageUrls = files.map(file => `http://localhost:5000/uploads/${file.filename}`);
        return await this.serviceService.createService({ ...serviceDto, image: imageUrls });
    }


    @Get()
    async getServices(): Promise<ResponseData<ServiceEntity[]>> {
        try {
            const items = await this.serviceService.getServices();
            return new ResponseData<ServiceEntity[]>(items, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<ServiceEntity[]>(null, HttpStatus.ERROR, error.message || HttpMessager.ERROR);
        }
    }

    @Get("/:id")
    async getServiceDetail(@Param("id", ParseIntPipe) id: number): Promise<ResponseData<ServiceEntity>> {
        try {
            const item = await this.serviceService.getDetail(id);
            return new ResponseData<ServiceEntity>(item, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<ServiceEntity>(null, HttpStatus.ERROR, error.message || HttpMessager.ERROR);
        }
    }

    @Patch("/:id")
    @UseInterceptors(FileInterceptor("image", {
        storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${uniqueSuffix}${ext}`);
            },
        }),
    }))
    async updateService(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateData: UpdateServiceDto,
        @UploadedFile() file?: Express.Multer.File
    ): Promise<ResponseData<ServiceEntity>> {
        try {
            if (file) {
                updateData.image = [`http://localhost:5000/uploads/${file.filename}`];
            }
            const updatedItem = await this.serviceService.updateService(id, updateData);
            return new ResponseData<ServiceEntity>(updatedItem, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<ServiceEntity>(null, HttpStatus.ERROR, error.message || HttpMessager.ERROR);
        }
    }

    @Delete("/:id")
    async deleteService(@Param("id", ParseIntPipe) id: number): Promise<ResponseData<null>> {
        try {
            await this.serviceService.deleteService(id);
            return new ResponseData<null>(null, HttpStatus.SUCCESS, HttpMessager.SUCCESS);
        } catch (error) {
            return new ResponseData<null>(null, HttpStatus.ERROR, error.message || HttpMessager.ERROR);
        }
    }
}
