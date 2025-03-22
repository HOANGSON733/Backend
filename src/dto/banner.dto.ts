import { IsString, IsNotEmpty } from "class-validator";

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
export class UpdateBannerDto {
    @IsNotEmpty()
    image: string;
    @IsNotEmpty()
    @IsString()
    title: string;
}