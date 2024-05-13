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
    dbConnection.end();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getChatMessages = async (chatId) => {
  const query = "SELECT * FROM `message` WHERE `chat` = ?";
  try {
    const dbConnection = await mysql.connect();
    const [rows, _] = await dbConnection.query(query, [chatId]);
    dbConnection.end();
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

export default { saveMessage, getChatMessages };
