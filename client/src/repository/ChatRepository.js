const getUserChats = async (userId) => {
  const url = `http://localhost:3000/chats/${userId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default { getUserChats };
