import { Base } from "./Base";
import { Like } from "./Like";
import { User } from "./User";

//tipagem dos tweets
type TweetType = "normal" | "reply";

export class Tweet extends Base {
  private replies: Tweet[];
  private likes: Like[];

  constructor(
    private content: string,
    private type: TweetType,
    private user: User
  ) {
    super();
    this.replies = [];
    this.likes = [];
  }

  public reply(tweet: Tweet) {
    if (this.user === tweet.user) {
      console.log("Você não pode responder a um tweet criado por você.");
    } else if (tweet.type === "normal") {
      console.log("Não foi possível responder. O tweet deve ser do tipo 'Reply'.");
    } else {
      this.replies.push(tweet);
      console.log(
        `@${tweet.user.show().username} respondeu a @${this.user.show().username}!`
      );
    }
    console.log("--------------------------------\n");
  }

  public like(like: Like) {
    const userFound = this.likes.some((l) => l.show().user === like.show().user);

    if (userFound) {
      console.log("Este usuário gostou deste tweet!");
    } else {
      this.likes.push(like);
      console.log(
        `@${like.show().user.show().username} curtiu @${this.user.show().username}!`
      );
    }
    console.log("--------------------------------\n");
  }

  public show() {
    return {
      content: this.content,
      likes: this.likes,
      replies: this.replies,
      type: this.type,
      user: this.user,
    };
  }

  private formatTweetLikes() {
    const likesCount = this.likes.length;

    if (likesCount === 0) {
      return "[0 Likes]";
    } else if (likesCount === 1) {
      return `[${this.likes[0].show().user.show().username} gostou disso!]`;
    } else {
      const firstLiker = this.likes[0].show().user.show().username;
      const otherLikesCount = likesCount - 1;
      return `[@${firstLiker} e outros ${otherLikesCount} gostaram desse tweet!]`;
    }
  }

  public showReplies() {
    const likes = this.formatTweetLikes();

    console.log(`@${this.user.show().username}: ${this.content} \n${likes}`);

    if (this.replies.length) {
      this.replies.forEach((reply) =>
        console.log(`   > ${reply.user.show().username}: ${reply.content}`)
      );
    }
    console.log("--------------------------------\n");
  }
}