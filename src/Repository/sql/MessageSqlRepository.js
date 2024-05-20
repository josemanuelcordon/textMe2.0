import mysql from "./db.js";
import date from "date-and-time";

const saveMessage = async (message) => {
  const query =
    "INSERT INTO `message` (`sender`, `chat`, `date`, `content`, `is_read`) VALUES (?, ?, ?, ?, 0)";
  try {
    let now = new Date();
    now = date.format(now, "YYYY-MM-DD HH:mm:ss");
    const dbConnection = await mysql.connect();
    await dbConnection.query(query, [
      message.sender,
      message.chat,
      now,
      message.content,
    ]);
    await dbConnection.end();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getChatMessages = async (chatId) => {
  const query = "SELECT * FROM `message` WHERE `chat` = ?";
  console.log("A");
  try {
    const dbConnection = await mysql.connect();
    const [rows, _] = await dbConnection.query(query, [chatId]);
    await dbConnection.end();
    console.log(rows);
    if (rows.length === 0) {
      return [];
    } else {
      return rows;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getMessageInfoByChat = async (chatId, userId) => {
  const contentQuery =
    "SELECT content FROM `message` WHERE `chat` = ? ORDER BY date DESC";
  const unreadMessagesQuery =
    "SELECT COUNT(*) AS unreadMessages FROM `message` WHERE `chat` = ? AND is_read = 0 AND sender != ?";
  const result = {};
  const dbConnection = await mysql.connect();
  const [rows] = await dbConnection.query(contentQuery, [chatId]);
  console.log(rows);
  result.content = rows[0]?.content ?? "";
  const [rows2] = await dbConnection.query(unreadMessagesQuery, [
    chatId,
    userId,
  ]);
  result.unreadMessages = rows2[0]?.unreadMessages;
  await dbConnection.end();
  return result;
};

const readMessages = async (chatId, userId) => {
  const query =
    "UPDATE `message` SET `is_read` = 1 WHERE `chat` = ? AND sender != ?";
  try {
    const dbConnection = await mysql.connect();
    const [rows, _] = await dbConnection.execute(query, [chatId, userId]);
    await dbConnection.end();
  } catch (error) {
    console.log(error);
  }
};

export default {
  saveMessage,
  getChatMessages,
  getMessageInfoByChat,
  readMessages,
};
