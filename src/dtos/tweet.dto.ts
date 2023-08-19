import { IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

const options = {
  message: "All fields are required!",
};

export class CreateTweetDTO {
  @IsString(options)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty(options)
  tweet: string;

  @IsString(options)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty(options)
  username: string;
}
