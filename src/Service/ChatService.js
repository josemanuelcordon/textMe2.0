import { ChatRepository } from "../Repository/index.js";
import UserService from "./UserService.js";
import MessageService from "./MessageService.js";
import date from "date-and-time";

const getUserChats = async (userId) => {
  const chats = await ChatRepository.getUserChats(userId);
  for (const chat of chats) {
    const messageData = await MessageService.getMessageInfoByChat(
      chat.id,
      userId
    );
    const userData = await UserService.getUserInfoByChat(chat.id, userId);
    if (chat.name === null) {
      chat.name = userData.username;
    }
    chat.lastMessage = messageData.content;

    let messageDate = date.format(messageData.date, "YYYY-MM-DD HH:mm");
    chat.lastMessageDate = messageDate;
    chat.unreadMessages = messageData.unreadMessages;
    chat.participants = userData.chatParticipants;
  }
  return chats;
};

const createChat = async (sender, receiver) => {
  const chat = await ChatRepository.createChat(sender, receiver);
  const userData = await UserService.getUserInfoByChat(chat.id, sender);

  chat.name = userData.username;
  let now = new Date();
  now = date.format(now, "YYYY-MM-DD HH:mm");
  chat.lastMessageDate = now;
  chat.unreadMessages = 0;
  return chat;
};

const createGroupChat = async (creator, members, name) => {
  const chat = await ChatRepository.createGroupChat(creator, members, name);
  const userData = await UserService.getUserInfoByChat(chat.id, creator);
  let now = new Date();
  now = date.format(now, "YYYY-MM-DD HH:mm");
  chat.lastMessageDate = now;
  chat.unreadMessages = 0;
  chat.participants = userData.chatParticipants;
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
