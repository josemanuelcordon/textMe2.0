import mysql from "./db.js";

const getUser = async (telephone, password) => {
  const query = "SELECT * FROM `users` WHERE `phone` = ? AND `password` = ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [
    telephone,
    password,
  ]);

  dbConnection.end();
  return results[0];
};

const getUsersByTelephone = async (telephone) => {
  const query = "SELECT * FROM `users` WHERE `phone` = ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [telephone]);
  dbConnection.end();
  return results;
};

const getUserIdsByChat = async (chatId) => {
  const query = "SELECT id_user FROM `chat_participants` WHERE `id_chat` = ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [chatId]);
  dbConnection.end();
  return results;
};

const getUserNameByChat = async (chatId, userId) => {
  const query =
    "SELECT name FROM `users` JOIN `chat_participants` ON id = id_user WHERE id_chat = ? AND id_user != ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [chatId, userId]);
  console.log(results);
  dbConnection.end();
  return results[0];
};

export default {
  getUser,
  getUsersByTelephone,
  getUserIdsByChat,
  getUserNameByChat,
};
