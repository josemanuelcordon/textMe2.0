import mysql from "./db.js";

const getUser = async (telephone, password) => {
  const query = "SELECT * FROM `users` WHERE `phone` = ? AND `password` = ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [
    telephone,
    password,
  ]);

  await dbConnection.end();
  return results[0];
};

const getUsersByTelephone = async (username) => {
  const query = "SELECT * FROM `users` WHERE `name` = ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [username]);
  await dbConnection.end();
  return results;
};

const getUserIdsByChat = async (chatId) => {
  const query = "SELECT id_user FROM `chat_participants` WHERE `id_chat` = ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [chatId]);
  await dbConnection.end();
  return results;
};

const getUserInfoByChat = async (chatId, userId) => {
  const query =
    "SELECT name, phone FROM `users` JOIN `chat_participants` ON id = id_user WHERE id_chat = ? AND id_user != ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [chatId, userId]);
  console.log(results);
  await dbConnection.end();
  return results[0];
};

const getUserFriends = async (userId) => {
  const query = `
    SELECT DISTINCT u.id, u.name, u.phone
    FROM chat_participants cp
    JOIN chat c ON cp.id_chat = c.id
    JOIN users u ON cp.id_user = u.id
    WHERE c.group_chat IS NULL
      AND cp.id_user != ?
      AND cp.id_chat IN (
        SELECT cp2.id_chat
        FROM chat_participants cp2
        WHERE cp2.id_user = ?
      )
  `;
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [userId, userId]);
  console.log("Amigos: ", results);
  await dbConnection.end();
  return results;
};
export default {
  getUser,
  getUsersByTelephone,
  getUserIdsByChat,
  getUserInfoByChat,
  getUserFriends,
};
