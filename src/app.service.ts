import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "./entities/user.entity";
import { Tweet } from "./entities/tweet.entity";
import { CreateUserDTO } from "./dtos/user.dto";
import { CreateTweetDTO } from "./dtos/tweet.dto";

@Injectable()
export class AppService {
  private _users: User[] = [];
  private _tweets: Tweet[] = [];

  findUserByName(username: string): User {
    return this._users.find((user) => user.username === username) ?? null;
  }

  findAllTweets(page: number = 1) {
    if (this._tweets.length > 15) {
      const start = 15 * (page - 1);
      const end = start + 15;
      return this._tweets.slice(start, end).map((tweet) => tweet.toMap());
    }
    return this._tweets.map((tweet) => tweet.toMap());
  }

  findTweetsByUser(username: string) {
    return this._tweets
      .filter((tweet) => tweet.user.username === username)
      .map((tweet) => tweet.toMap());
  }

  createUser(userDTO: CreateUserDTO) {
    if (this.findUserByName(userDTO.username)) {
      throw new ConflictException();
    }
    const user = new User(userDTO.username, userDTO.avatar);
    this._users.push(user);
    return user.toMap();
  }

  createTweet(tweetDTO: CreateTweetDTO) {
    const user = this.findUserByName(tweetDTO.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const tweet = new Tweet(user, tweetDTO.tweet);
    this._tweets.unshift(tweet);
    return tweet.toMap();
  }
}
