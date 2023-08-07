import { Base } from "./Base";
import { Tweet } from "./Tweet";

export class User extends Base {
  private _followers: User[];
  private _tweets: Tweet[];

  constructor(
    private _name: string,
    private _username: string,
    private _email: string,
    private _password: string
  ) {
    super();
    this._followers = [];
    this._tweets = [];
  }

  public sendTweet(tweet: Tweet) {
    const isTweetCreatedByUser = this.id === tweet.show().user.id;
    const isTweetReply = tweet.show().type === "reply";

    if (!isTweetCreatedByUser) {
      console.log("Não é possível enviar um tweet criado por outra pessoa.");
    } else if (isTweetReply) {
      console.log("Não é possível enviar um tweet do tipo reply.");
    } else {
      console.log(`@${this._username} publicou um novo tweet!`);
      this._tweets.unshift(tweet);
    }

    console.log("--------------------------------\n");
  }

  public follow(user: User) {
    if (user === this) {
      console.log("Não é possível se seguir.");
    } else {
      this._followers.push(user);
      console.log(`${this._username} começou a seguir @${user._username}!`);
    }

    console.log("--------------------------------\n");
  }

  public show() {
    return {
      name: this._name,
      username: this._username,
      email: this._email,
      tweets: this._tweets.length,
      followers: this._followers.length,
    };
  }

  private formatTweetLikes(tweet: Tweet) {
    const likesCount = tweet.show().likes.length;

    if (likesCount === 0) {
      return "[0 Likes]";
    } else if (likesCount === 1) {
      const liker = tweet.show().likes[0].show().user._username;
      return `[${liker} like this!]`;
    } else {
      const liker = tweet.show().likes[0].show().user._username;
      const otherLikesCount = likesCount - 1;
      return `[@${liker} e outros ${otherLikesCount} usuarios gostaram disso!]`;
    }
  }

  public showFeed() {
    if (this._followers.length === 0) {
      console.log("Não há nada para mostrar aqui! siga alguem para começar!");
      return;
    }

    this._followers.forEach((user) => user.showTweets());
  }

  public showTweets() {
    this._tweets.forEach((tweet) => {
      const likes = this.formatTweetLikes(tweet);

      console.log(`@${this._username}: ${tweet.show().content} \n${likes}`);

      if (tweet.show().replies.length) {
        tweet.show().replies.forEach((reply) =>
          console.log(`   > ${reply.show().user._username}: ${reply.show().content}`)
        );
      }

      console.log("--------------------------------\n");
    });
  }
}