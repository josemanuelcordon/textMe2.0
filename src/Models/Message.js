function Message(content, sender, date, is_read = false) {
  this.content = content;
  this.sender = sender;
  this.date = date;
  this.is_read = is_read;

  this.getContent = () => {
    return this.messages;
  };

  this.getSender = () => {
    return this.sender;
  };

  this.getDate = () => {
    return this.date;
  };

  this.isRead = () => {
    return this.is_read;
  };

  this.readMessage = () => {
    this.is_read = true;
  };
}

export default Message;
