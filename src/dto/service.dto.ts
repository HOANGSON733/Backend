import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    image: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    description: string

}
export class UpdateServiceDto {
    content?: string
    image?: string
    title?: string
    description?: string

}




