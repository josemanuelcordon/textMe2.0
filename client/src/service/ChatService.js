import ChatRepository from "../repository/ChatRepository.js";
import date from "date-and-time";

const getUserChats = async (userId) => {
  return await ChatRepository.getUserChats(userId);
};

const createChat = async (sender, receiver) => {
  let chatDate = new Date();
  chatDate = date.format(chatDate, "YYYY-MM-DD HH:mm:ss");
  return await ChatRepository.createChat(sender, receiver, chatDate);
};

const createGroupChat = async (creator, members, groupName) => {
  let groupDate = new Date();
  groupDate = date.format(groupDate, "YYYY-MM-DD HH:mm:ss");
  return await ChatRepository.createGroupChat(
    creator,
    members,
    groupName,
    groupDate
  );
};

export default {
  getUserChats,
  createChat,
  createGroupChat,
};
