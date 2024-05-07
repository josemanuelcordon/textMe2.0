import messageRepository from "../repository/messageRepository";

const sendMessage = async (message) => {
  await messageRepository.sendMessage(message);
};

export default {
  sendMessage,
};
