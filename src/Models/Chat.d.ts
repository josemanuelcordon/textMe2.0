import User from "./User";
import Message from "./Message";

declare class Chat {
  public constructor();

  private messages: Array<Message>;
  private participants: Array<User>;
  private image: string;

  public getMessages(): Array<Message>;
  public setMessages(messages: Array<Message>): void;
  public getParticipants(): Array<User>;
  public setParticipants(participants: Array<User>): void;
  public getImage(): string;
  public setImage(image: string): void;
}

export default Chat;
