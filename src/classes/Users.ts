import { User } from "./User";

export class Users {
  private _data: User[];

  constructor() {
    this._data = [];
  }

  public addUser(user: User) {
    const username = user.show().username;

    const userExists = this._data.some((u) => u.show().username === username);

    if (userExists) {
      console.log("Não foi possível cadastrar. Este username já existe");
    } else {
      this._data.push(user);
      console.log(`User @${username} foi adicionado ao database`);
    }

    console.log("--------------------------------\n");
  }
}