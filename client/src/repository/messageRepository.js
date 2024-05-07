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

export default {
  sendMessage,
};
