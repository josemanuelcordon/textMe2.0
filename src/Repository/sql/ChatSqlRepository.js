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
    dbConnection.end();
    return rows;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default {
  getUserChats,
};
