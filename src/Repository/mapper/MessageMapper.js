import { Message } from "../../Model/Message.js";
import date from "date-and-time";

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
  let messageDate = date.format(messageDto.date, "YYYY-MM-DD HH:mm:ss");
  message.date = messageDate;
  message.content = messageDto.content;
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
