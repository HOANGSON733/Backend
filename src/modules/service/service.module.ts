import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceEntity } from "./service.entity";
import { ServiceController } from "./service.controller";
import { ServiceService } from "./service.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ServiceEntity])
    ],
    controllers: [ServiceController],
    providers: [ServiceService]
})
export class serviceModule { }