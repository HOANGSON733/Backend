import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "./blog.entity";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([BlogEntity])
    ],
    controllers:[BlogController],
    providers:[BlogService]

})
export class blogModule{
    
}