function Chat() {
  this.messages = new Array();
  this.participants = new Array();
  this.image = undefined;

  this.getMessages = () => {
    return this.messages;
  };

  this.setMessages = (messages) => {
    this.messages = messages;
  };

  this.getParticipants = () => {
    return this.participants;
  };

  this.setParticipants = (participants) => {
    this.participants = participants;
  };

  this.getImage = () => {
    return this.image;
  };

  this.setImage = (image) => {
    this.image = image;
  };
}

export default Chat;
