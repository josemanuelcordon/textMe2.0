const sendMessage = async (message) => {
  const response = await fetch("http://localhost:3000/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  return response.ok;
};

const getChatMessages = async (chatId, userId) => {
  const response =
    await fetch(`http://localhost:3000/messages/${chatId}/${userId}
  }`);
  const data = await response.json();
  return data;
};

const readMessages = async (chatId, userId) => {
  const response = await fetch(
    `http://localhost:3000/read/${chatId}/${userId}`
  );
};

export default {
  sendMessage,
  getChatMessages,
  readMessages,
};
