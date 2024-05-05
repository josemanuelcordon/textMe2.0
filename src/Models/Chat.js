function Chat() {
  this.messages = new Array();

  this.getMessages = () => {
    return this.messages;
  };

  this.setMessages = (messages) => {
    this.messages = messages;
  };
}

export default Chat;
