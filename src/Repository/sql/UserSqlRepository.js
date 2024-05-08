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

export default { getUser, getUsersByTelephone };
