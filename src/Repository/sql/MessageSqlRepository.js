import mysql from "./db.js";

import MessageMapper from "../mapper/MessageMapper.js";

const saveMessage = async (message) => {
  const insertQuery =
    "INSERT INTO `message` (`sender`, `chat`, `date`, `content`) VALUES (?, ?, ?, ?)";
  const selectQuery = "SELECT * FROM `message` WHERE `id` = ?";
  try {
    const dbConnection = await mysql.connect();
    const [insertResult] = await dbConnection.query(insertQuery, [
      message.sender,
      message.chat,
      message.date,
      message.content,
    ]);
    const insertId = insertResult.insertId;

    const [rows] = await dbConnection.query(selectQuery, [insertId]);
    await dbConnection.end();

    if (rows.length > 0) {
      const messageDto = rows[0];
      return MessageMapper.toModel(messageDto);
    } else {
      throw new Error("Failed to retrieve the inserted message");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getChatMessages = async (chatId) => {
  const query = `
  SELECT 
    m.id, 
    m.sender, 
    m.chat, 
    m.content, 
    m.date,
    u.id AS user_id, 
    u.username, 
    u.email 
  FROM 
    message AS m 
  JOIN 
    users AS u 
  ON 
    u.id = m.sender 
  WHERE 
    m.chat = ?
`;
  try {
    const dbConnection = await mysql.connect();
    const [rows, _] = await dbConnection.query(query, [chatId]);
    await dbConnection.end();
    if (rows.length === 0) {
      return [];
    } else {
      return rows.map(MessageMapper.toModel);
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getMessageInfoByChat = async (chatId, userId) => {
  const contentQuery =
    "SELECT content, date FROM `message` WHERE `chat` = ? ORDER BY date DESC";
  const unreadMessagesQuery =
    "SELECT COUNT(*) AS unreadMessages FROM `message` LEFT JOIN `message_read` ON id = id_message AND id_user = ? WHERE chat = ? AND sender != ? AND id_message IS NULL";
  const result = {};
  const dbConnection = await mysql.connect();
  const [rows] = await dbConnection.query(contentQuery, [chatId]);
  result.content = rows[0]?.content ?? "";
  result.date = rows[0]?.date ?? "";
  const [rows2] = await dbConnection.query(unreadMessagesQuery, [
    userId,
    chatId,
    userId,
  ]);
  result.unreadMessages = rows2[0]?.unreadMessages;
  await dbConnection.end();
  return result;
};

const readMessages = async (chatId, userId) => {
  const queryMessagesToRead = `
      SELECT m.id
      FROM message m
      LEFT JOIN message_read mr ON m.id = mr.id_message AND mr.id_user = ?
      WHERE m.chat = ? AND m.sender != ?
      GROUP BY m.id
      HAVING COUNT(mr.id_user) = 0;
    `;
  const query =
    "INSERT INTO `message_read` (`id_message`, `id_user`) VALUES (?, ?)";
  try {
    const dbConnection = await mysql.connect();

    const [messagesToRead] = await dbConnection.execute(queryMessagesToRead, [
      userId,
      chatId,
      userId,
    ]);

    for (const message of messagesToRead) {
      await dbConnection.execute(query, [message.id, userId]);
    }
    await dbConnection.end();
  } catch (error) {}
};

const deleteMessage = async (messageId) => {
  const query = "DELETE FROM `message` WHERE `id` =?";
  try {
    const dbConnection = await mysql.connect();
    await dbConnection.query(query, [messageId]);
    await dbConnection.end();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateMessage = async (messageId, content) => {
  const query = "UPDATE `message` SET `content` =? WHERE `id` =?";
  try {
    const dbConnection = await mysql.connect();
    await dbConnection.query(query, [content, messageId]);
    await dbConnection.end();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default {
  saveMessage,
  getChatMessages,
  getMessageInfoByChat,
  readMessages,
  deleteMessage,
  updateMessage,
};
