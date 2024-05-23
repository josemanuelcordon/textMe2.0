function User(username) {
  this.username = username;
  this.image = null;
  this.chats = new Array();

  this.addChat = function (chat) {
    this.chats.push(chat);
  };

  this.getChat = function () {
    return this.chats;
  };
}

export default User;
