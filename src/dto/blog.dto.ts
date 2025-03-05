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
    content?: string
    image?: string
    title?: string
    description?: string

}




