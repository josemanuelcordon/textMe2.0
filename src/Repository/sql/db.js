import mysql from "mysql2/promise";

const connect = async () => {
  const connection = await mysql.createConnection({
    host: "database",
    user: "root",
    password: "root",
    database: "textMe",
  });

  return connection;
};

export default { connect };
