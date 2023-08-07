import { Base } from "./Base";
import { User } from "./User";

export class Like extends Base {
  constructor(private _user: User) {
    super();
  }

  public show() {
    return {
      user: this._user,
    };
  }
}
