import mysql from "./db.js";

const getUserChats = async (userId) => {
  const query = `
    SELECT c.id, c.name, c.group_chat
    FROM chat c
    INNER JOIN chat_participants cp ON c.id = cp.id_chat
    WHERE cp.id_user = ?;
  `;
  try {
    const dbConnection = await mysql.connect();
    const [rows, fields] = await dbConnection.execute(query, [userId]);
    await dbConnection.end();
    return rows ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createChat = async (sender, receiver) => {
  const creationQuery =
    "INSERT INTO `chat` (`name`, `group_chat`) VALUES (NULL, NULL)";
  const relationQuery =
    "INSERT INTO `chat_participants` (`id_chat`, `id_user`) VALUES (?, ?), (?, ?)";
  const getChatQuery = `
  SELECT c.id, c.name, c.group_chat
  FROM chat c
  WHERE c.id = ?
`;
  try {
    const dbConnection = await mysql.connect();
    await dbConnection.beginTransaction();
    const [chatInfo] = await dbConnection.execute(creationQuery);
    const chatId = chatInfo.insertId;

    await dbConnection.execute(relationQuery, [
      chatId,
      sender,
      chatId,
      receiver,
    ]);
    await dbConnection.commit();
    const [rows] = await dbConnection.execute(getChatQuery, [chatId]);

    await dbConnection.end();
    return rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createGroupChat = async (creator, members, name) => {
  const creationQuery =
    "INSERT INTO `chat` (`name`, `group_chat`) VALUES (?, true)";
  const relationQuery =
    "INSERT INTO `chat_participants` (`id_chat`, `id_user`) VALUES (?, ?)";
  const getChatQuery = `
  SELECT c.id, c.name, c.group_chat
  FROM chat c
  WHERE c.id = ?
`;
  try {
    const dbConnection = await mysql.connect();
    await dbConnection.beginTransaction();
    const [chatInfo] = await dbConnection.execute(creationQuery, [name]);
    const chatId = chatInfo.insertId;

    for (const userId of members) {
      await dbConnection.execute(relationQuery, [chatId, userId]);
    }
    await dbConnection.execute(relationQuery, [chatId, creator]);
    await dbConnection.commit();
    const [rows] = await dbConnection.execute(getChatQuery, [chatId]);

    await dbConnection.end();
    return rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const isGroupChat = async (chatId) => {
  const query = `
    SELECT c.group_chat
    FROM chat c
    WHERE c.id = ?
  `;
  try {
    const dbConnection = await mysql.connect();
    const [rows, fields] = await dbConnection.execute(query, [chatId]);
    await dbConnection.end();
    return rows[0].group_chat !== null;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default {
  getUserChats,
  createChat,
  createGroupChat,
  isGroupChat,
};
