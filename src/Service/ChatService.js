import ChatRepository from "../Repository/sql/ChatSqlRepository.js";
import UserService from "./UserService.js";
import MessageService from "./MessageService.js";

const getUserChats = async (userId) => {
  const chats = await ChatRepository.getUserChats(userId);
  for (const chat of chats) {
    const messageData = await MessageService.getMessageInfoByChat(
      chat.id,
      userId
    );
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

const createChat = async (sender, receiver) => {
  const chat = await ChatRepository.createChat(sender, receiver);
  const userData = await UserService.getUserInfoByChat(chat.id, sender);
  chat.name = userData.name;
  chat.phone = userData.phone;
  chat.unreadMessages = 0;
  return chat;
};

const createGroupChat = async (creator, members, name) => {
  const chat = await ChatRepository.createGroupChat(creator, members, name);
  chat.unreadMessages = 0;
  return chat;
};

export default {
  getUserChats,
  createChat,
  createGroupChat,
};
