import { IsNotEmpty, IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsArray()
    @IsUrl({}, { each: true }) // Đảm bảo mỗi phần tử trong mảng là URL hợp lệ
    image: string[];

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateServiceDto {
    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsArray()
    @IsUrl({}, { each: true }) // Đảm bảo mỗi phần tử trong mảng là URL hợp lệ
    image?: string[];

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
