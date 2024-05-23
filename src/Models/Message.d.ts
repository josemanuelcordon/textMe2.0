import User from "./User";

declare class Message {
  public constructor(
    content: string,
    sender: User,
    date: string,
    is_read: boolean
  );

  private content: string;
  private sender: User;
  private date: string;
  private is_read: boolean;

  public getContent(): string;

  public getSender(): User;

  public getDate(): string;

  public isRead(): boolean;
}

export default Message;
