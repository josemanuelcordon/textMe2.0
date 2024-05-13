import ChatRepository from "../Repository/sql/ChatSqlRepository.js";
import UserService from "./UserService.js";

const getUserChats = async (userId) => {
  const chats = await ChatRepository.getUserChats(userId);
  for (const chat of chats) {
    if (chat.name === null) {
      chat.name =
        (await UserService.getUserNameByChat(chat.id, userId)) ?? "group";
    }
  }
  return chats;
};

export default {
  getUserChats,
};
