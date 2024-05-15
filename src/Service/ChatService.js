import ChatRepository from "../Repository/sql/ChatSqlRepository.js";
import UserService from "./UserService.js";
import MessageService from "./MessageService.js";

const getUserChats = async (userId) => {
  const chats = await ChatRepository.getUserChats(userId);
  for (const chat of chats) {
    const messageData = await MessageService.getMessageInfoByChat(chat.id);
    if (chat.name === null) {
      const userData = await UserService.getUserInfoByChat(chat.id, userId);
      chat.name = userData.name;
      chat.phone = userData.phone;
    }
    chat.lastMessage = messageData.content;
    chat.unreadMessages = messageData.unreadMessages;
  }
  return chats;
};

export default {
  getUserChats,
};
