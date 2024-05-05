function User(username, telephone) {
  this.username = username;
  this.telephone = telephone;
  this.image = null;
  this.chats = new Array();

  this.agregarChat = function (chat) {
    this.chats.push(chat);
  };

  this.obtenerChats = function () {
    return this.chats;
  };
}

export default User;
