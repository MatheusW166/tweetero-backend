import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { Transform } from "class-transformer";

const options = {
  message: "All fields are required!",
};

export class CreateUserDTO {
  @IsString(options)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty(options)
  username: string;

  @IsString(options)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty(options)
  @IsUrl({}, options)
  avatar: string;
}
