declare class Chat {
  public constructor();

  private messages: Array<Message>;

  public getMessages(): Array<Message>;
  public setMessages(messages: Array<Message>): void;
}

export default Chat;
