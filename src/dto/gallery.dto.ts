import { IsNotEmpty, IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreateGalleryDto {
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

    @IsString()
    @IsNotEmpty()
    category: string;
}

export class UpdateGalleryDto {
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

    @IsOptional()
    @IsString()
    category?: string;
}