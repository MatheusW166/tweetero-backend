import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateUserDTO } from "./dtos/user.dto";
import { CreateTweetDTO } from "./dtos/tweet.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  health() {
    return "I'm okay!";
  }

  @Post("/sign-up")
  @HttpCode(200)
  signUp(@Body() user: CreateUserDTO) {
    return this.appService.createUser(user);
  }

  @Post("/tweets")
  postTweet(@Body() tweet: CreateTweetDTO) {
    return this.appService.createTweet(tweet);
  }

  @Get("/tweets")
  getTweets(
    @Query(
      "page",
      new ParseIntPipe({
        optional: true,
      }),
    )
    page?: number,
  ) {
    if (page < 1) throw new BadRequestException();
    return this.appService.findAllTweets(page);
  }

  @Get("/tweets/:username")
  getTweetsFromUser(@Param("username") username: string) {
    return this.appService.findTweetsByUser(username);
  }
}
