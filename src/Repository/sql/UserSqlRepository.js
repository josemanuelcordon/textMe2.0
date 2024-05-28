import mysql from "./db.js";

const getUser = async (username, password) => {
  const query = "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [
    username,
    password,
  ]);

  await dbConnection.end();
  return results[0];
};

const getUsersByUsername = async (username) => {
  const query = "SELECT * FROM `users` WHERE `username` LIKE ?";
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
  console.log("chat: ", chatId, " user: ", userId);
  const query =
    "SELECT username FROM `users` JOIN `chat_participants` ON id = id_user WHERE id_chat = ? AND id_user != ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [chatId, userId]);
  console.log("RESULTADOS: ", results);
  await dbConnection.end();
  return results[0];
};

const getUserFriends = async (userId) => {
  const query = `
    SELECT DISTINCT u.id, u.username
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

const getChatParticipantsExceptMe = async (chatId, userId) => {
  const query =
    "SELECT id_user  FROM `chat_participants` WHERE `id_chat` = ? AND id_user != ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [chatId, userId]);
  await dbConnection.end();
  return results;
};

const createUser = async (username, email, password) => {
  const query =
    "INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)";
  const getUserQuery =
    "SELECT `id`, `username`, `email` FROM `users` WHERE `id` = ?";

  let dbConnection;
  try {
    dbConnection = await mysql.connect();

    // Insertar el usuario
    const [result] = await dbConnection.query(query, [
      username,
      email,
      password,
    ]);

    // Obtener el usuario recién creado
    const [userRows] = await dbConnection.query(getUserQuery, [
      result.insertId,
    ]);

    // Cerrar la conexión
    await dbConnection.end();

    // Retornar el usuario creado
    if (userRows.length > 0) {
      return userRows[0];
    } else {
      return {};
    }
  } catch (error) {
    await dbConnection.end();
    return null;
  }
};

export default {
  getUser,
  getUsersByUsername,
  getUserIdsByChat,
  getUserInfoByChat,
  getUserFriends,
  getChatParticipantsExceptMe,
  createUser,
};
