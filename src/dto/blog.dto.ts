import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
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
export class UpdateBlogDto {
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




