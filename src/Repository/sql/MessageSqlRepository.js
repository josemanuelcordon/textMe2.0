import mysql from "./db.js";
import date from "date-and-time";

const saveMessage = async (message) => {
  const query =
    "INSERT INTO `message` (`sender`, `date`, `content`) VALUES (?, ?, ?)";
  try {
    let now = new Date();
    now = date.format(now, "YYYY-MM-DD HH:mm:ss");
    const dbConnection = await mysql.connect();
    await dbConnection.query(query, [message.sender, now, message.content]);
    dbConnection.end();
    console.log("llego aqui");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default { saveMessage };
