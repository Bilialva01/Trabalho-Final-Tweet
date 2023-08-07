import { Like } from "./classes/Like";
import { Tweet } from "./classes/Tweet";
import { User } from "./classes/User";
import { DataBase } from "./database/Users";

//primeiro user
const user_one = new User(
  "Pietro Bilialva",
  "Pietro",
  "pietrobilialva@gmail.com",
  "senhateste1"
);

//segundo user
const user_two = new User(
  "Gabriel Silva", 
  "Gabriel", 
  "gabrielsilva@gmail.com", 
  "senhateste2"
);

//terceiro user
const user_three = new User(
  "Joao Almeida",
  "Joao",
  "joaoalmeida@gmail.com",
  "senhateste3"
);

//REGISTER

DataBase.addUser(user_one);
DataBase.addUser(user_two);
DataBase.addUser(user_three);

//TWEETS-NORMAL

// primeiro tweet - tipo normal
const tweet_one = new Tweet(
  "primeiro tweet teste",
  "normal",
  user_one
);

// segundo tweet - tipo normal
const tweet_two = new Tweet(
  "segundo tweet teste", 
  "normal", 
  user_one
);

// teceiro tweet - tipo normal
const tweet_three = new Tweet(
  "terceiro tweet teste", 
  "normal", 
  user_one
);

//TWEETS-REPLY

// primeiro tweet - tipo reply
const reply_one = new Tweet("primeiro reply teste", "reply", user_two);

// segundo tweet - tipo reply
const reply_two = new Tweet("segundo reply teste", "reply", user_two);

// terceiro tweet - tipo reply
const reply_three = new Tweet("terceiro reply teste", "reply", user_three);

user_one.sendTweet(tweet_one);
user_one.sendTweet(tweet_two);
user_one.sendTweet(tweet_three);

//LIKES

const like_one = new Like(user_one);
const like_two = new Like(user_two);
const like_three = new Like(user_three);

tweet_one.like(like_two);
tweet_one.like(like_three);
tweet_three.like(like_one);

//FOLLOWER

user_two.follow(user_one);
user_two.follow(user_three);
user_three.follow(user_one);

//REPLY

tweet_one.reply(reply_one);
tweet_two.reply(reply_two);
tweet_one.reply(reply_three);

//SHOWREPLIES
tweet_one.showReplies();

//SHOW FEED
user_two.showFeed();
