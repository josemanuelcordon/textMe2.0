import mysql from "./db.js";
import date from "date-and-time";

const saveMessage = async (message) => {
  const query =
    "INSERT INTO `message` (`sender`, `chat`, `date`, `content`) VALUES (?, ?, ?, ?)";
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
  const query =
    "SELECT * FROM `message` AS m JOIN `users` AS u ON u.id = m.sender WHERE `chat` = ?";
  try {
    const dbConnection = await mysql.connect();
    const [rows, _] = await dbConnection.query(query, [chatId]);
    await dbConnection.end();
    if (rows.length === 0) {
      return [];
    } else {
      const mappedRows = rows.map((message) => {
        return {
          id: message.id,
          sender: message.sender,
          chat: message.chat,
          content: message.content,
          date: message.date,
          is_read: message.is_read,
          user: {
            username: message.username,
            email: message.email,
          },
        };
      });
      console.log("Filas mapeadas", mappedRows);
      return mappedRows;
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
  const queryMessagesToRead =
    "SELECT * FROM `message` LEFT JOIN `message_read` ON id = id_message WHERE chat = ? AND sender != ? AND id_message IS NULL";
  const query =
    "INSERT INTO `message_read` (`id_message`, `id_user`) VALUES (?, ?)";
  try {
    const dbConnection = await mysql.connect();

    const [messagesToRead] = await dbConnection.execute(queryMessagesToRead, [
      chatId,
      userId,
    ]);

    for (const message of messagesToRead) {
      await dbConnection.execute(query, [message.id, userId]);
    }
    await dbConnection.end();
  } catch (error) {}
};

export default {
  saveMessage,
  getChatMessages,
  getMessageInfoByChat,
  readMessages,
};
