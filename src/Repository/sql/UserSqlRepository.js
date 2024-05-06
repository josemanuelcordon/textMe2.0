import mysql from "./db.js";

const getUser = async (telephone, password) => {
  const query = "SELECT * FROM `users` WHERE `phone` = ? AND `password` = ?";
  const dbConnection = await mysql.connect();
  console.log(telephone, password);
  const [results, fields] = await dbConnection.query(query, [
    telephone,
    password,
  ]);

  console.log(results);

  dbConnection.end();
  return results.length > 0;
};

export default { getUser };
