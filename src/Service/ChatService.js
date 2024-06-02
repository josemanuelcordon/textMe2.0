import { ChatRepository } from "../Repository/index.js";
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
      chat.name = userData.username;
    }
    chat.lastMessage = messageData.content;
    chat.lastMessageDate = messageData.date;
    chat.unreadMessages = messageData.unreadMessages;
  }
  return chats;
};

const createChat = async (sender, receiver) => {
  const chat = await ChatRepository.createChat(sender, receiver);
  console.log(chat);
  const userData = await UserService.getUserInfoByChat(chat.id, sender);

  chat.name = userData.username;
  chat.unreadMessages = 0;
  return chat;
};

const createGroupChat = async (creator, members, name) => {
  const chat = await ChatRepository.createGroupChat(creator, members, name);
  chat.unreadMessages = 0;
  return chat;
};

const isGroupChat = async (chatId) => {
  return await ChatRepository.isGroupChat(chatId);
};

export default {
  getUserChats,
  createChat,
  createGroupChat,
  isGroupChat,
};
