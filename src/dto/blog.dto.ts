import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsString()
    description: string


}
export class UpdateBlogDto {
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsString()
    description: string

}




