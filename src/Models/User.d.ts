declare class User {
  public constructor(username: string, telephone: number);

  public username: string;
  public telephone: number;
  public image: string;
  public chats: Array<Chat>;
}

export default User;
