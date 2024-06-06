import mysql from "./db.js";
import UserMapper from "../mapper/UserMapper.js";

const getAllUsers = async () => {
  const query = "SELECT * FROM `users`";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query);
  await dbConnection.end();
  return results;
};

const getUser = async (username, password) => {
  const query = "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [
    username,
    password,
  ]);
  await dbConnection.end();

  const userDto = rows[0] ?? null;
  return UserMapper.toModel(userDto);
};

const getUsersByUsername = async (username) => {
  const query = "SELECT * FROM `users` WHERE `username` LIKE ?";
  const dbConnection = await mysql.connect();

  const [userDtos, _] = await dbConnection.query(query, [`${username}%`]);
  await dbConnection.end();
  return userDtos.map((dto) => UserMapper.toModel(dto));
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
    "SELECT username FROM `users` JOIN `chat_participants` ON id = id_user WHERE id_chat = ? AND id_user != ?";

  const participantsQuery =
    "SELECT username FROM `users` JOIN `chat_participants` ON id = id_user WHERE id_chat = ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [chatId, userId]);
  const userInfo = {};
  userInfo.username = results[0].username;
  const [results2, _] = await dbConnection.query(participantsQuery, [chatId]);
  userInfo.chatParticipants = results2;
  await dbConnection.end();
  return userInfo;
};

const getUserFriends = async (userId) => {
  const query = `
    SELECT DISTINCT u.id, u.username, u.active, u.is_banned
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

  const [userDtos, _] = await dbConnection.query(query, [userId, userId]);
  await dbConnection.end();

  return userDtos.map((dto) => UserMapper.toModel(dto));
};

const getChatParticipantsExceptMe = async (chatId, userId) => {
  const query =
    "SELECT id_user  FROM `chat_participants` WHERE `id_chat` = ? AND id_user != ?";
  const dbConnection = await mysql.connect();

  const [results, fields] = await dbConnection.query(query, [chatId, userId]);
  await dbConnection.end();
  return results;
};

const createUser = async (user) => {
  const userDto = UserMapper.toDto(user);
  const query =
    "INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)";
  const getUserQuery =
    "SELECT `id`, `username`, `email` FROM `users` WHERE `id` = ?";

  let dbConnection;
  try {
    dbConnection = await mysql.connect();

    // Insertar el usuario
    const [result] = await dbConnection.query(query, [
      userDto.username,
      userDto.email,
      userDto.password,
    ]);

    // Obtener el usuario recién creado
    const [userDto] = await dbConnection.query(getUserQuery, [result.insertId]);

    // Cerrar la conexión
    await dbConnection.end();

    // Retornar el usuario creado
    if (userRows.length > 0) {
      const userDto = userRows[0];
      return UserMapper.toModel(userDto);
    } else {
      return {};
    }
  } catch (error) {
    await dbConnection.end();
    return null;
  }
};

const enableAccount = async (userId) => {
  const query = "UPDATE `users` SET `active` = 1 WHERE `id` =?";
  const dbConnection = await mysql.connect();

  await dbConnection.execute(query, [userId]);
  await dbConnection.end();
};

const unableAccount = async (userId) => {
  const query = "UPDATE `users` SET `active` = 0 WHERE `id` =?";
  const dbConnection = await mysql.connect();

  await dbConnection.execute(query, [userId]);
  await dbConnection.end();
};

const banUser = async (userId) => {
  const query = "UPDATE `users` SET `is_banned` = 1 WHERE `id` =?";
  const dbConnection = await mysql.connect();

  await dbConnection.execute(query, [userId]);
  await dbConnection.end();
};

const disbanUser = async (userId) => {
  const query = "UPDATE `users` SET `is_banned` = 0 WHERE `id` =?";
  const dbConnection = await mysql.connect();

  await dbConnection.execute(query, [userId]);
  await dbConnection.end();
};

export default {
  getAllUsers,
  getUser,
  getUsersByUsername,
  getUserIdsByChat,
  getUserInfoByChat,
  getUserFriends,
  getChatParticipantsExceptMe,
  createUser,
  enableAccount,
  unableAccount,
  banUser,
  disbanUser,
};
