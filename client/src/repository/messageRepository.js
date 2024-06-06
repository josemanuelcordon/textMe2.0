const sendMessage = async (message) => {
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );

  return await response.json();
};

const getChatMessages = async (chatId, userId) => {
  const response =
    await fetch(`${window.location.protocol}//${window.location.hostname}/messages/${chatId}/${userId}
  }`);
  const data = await response.json();
  return data;
};

const readMessages = async (chatId, userId) => {
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/read/${chatId}/${userId}`
  );
};

const deleteMessage = async (messageId) => {
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/message/${messageId}`,
    {
      method: "DELETE",
    }
  );
};

const updateMessage = async (messageId, content) => {
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/message/${messageId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    }
  );
};

export default {
  sendMessage,
  getChatMessages,
  readMessages,
  deleteMessage,
  updateMessage,
};
