import { Chat } from "../../Model/Chat";

const toDto = (chat) => {
  return {
    id: chat.id,
    name: chat.name,
    groupChat: chat.groupChat,
  };
};

const toModel = (chatDto) => {
  if (!chatDto) {
    return null;
  }

  const chat = new Chat();
  chat.id = chatDto.id;
  chat.name = chatDto.name;
  chat.groupChat = chatDto.groupChat;

  return chat;
};

export default {
  toDto,
  toModel,
};
