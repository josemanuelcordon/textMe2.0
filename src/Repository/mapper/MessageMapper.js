const toDto = (message) => {
  return {
    id: message.id,
    sender: message.sender,
    chat: message.chat,
    content: message.content,
  };
};

const toModel = (messageDto) => {
  if (!messageDto) {
    return null;
  }

  const message = new Message();
  message.id = messageDto.id;
  message.sender = messageDto.sender;
  message.chat = messageDto.chat;
  message.content = messageDto.content;
  message.date = messageDto.date;
  message.user = {
    id: messageDto.user_id,
    username: messageDto.username,
    email: messageDto.email,
  };

  return message;
};

export default {
  toDto,
  toModel,
};
