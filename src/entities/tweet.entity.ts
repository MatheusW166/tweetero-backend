import { User } from "./user.entity";

export class Tweet {
  constructor(
    private _user: User,
    private _tweet: string,
  ) {}

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
  }

  get tweet(): string {
    return this._tweet;
  }

  set tweet(tweet: string) {
    this._tweet = tweet;
  }

  toMap() {
    return {
      tweet: this.tweet,
      username: this.user.username,
      avatar: this.user.avatar,
    };
  }
}
