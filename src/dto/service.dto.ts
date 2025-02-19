import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsUrl()
    image: string;

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
    @IsUrl()
    image?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
