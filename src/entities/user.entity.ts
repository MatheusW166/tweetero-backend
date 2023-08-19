export class User {
  constructor(
    private _username: string,
    private _avatar: string,
  ) {}

  get username(): string {
    return this._username;
  }

  set username(name: string) {
    this._username = name;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(avatar: string) {
    this._avatar = avatar;
  }

  toMap() {
    return {
      username: this.username,
      avatar: this.avatar,
    };
  }
}
