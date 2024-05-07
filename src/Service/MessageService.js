import messageRepository from "../Repository/sql/MessageSqlRepository.js";

const saveMessage = async (sender, content, date) => {
  const message = {
    sender: sender,
    content: content,
    date: date,
  };

  await messageRepository.saveMessage(message);
};

export default {
  saveMessage,
};
