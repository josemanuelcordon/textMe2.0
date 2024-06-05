const apiUrl = import.meta.env.VITE_API_URL;

const getUserChats = async (userId) => {
  const url = `${apiUrl}/chats/${userId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const createChat = async (sender, receiver) => {
  const url = `${apiUrl}/chat/create`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender,
      receiver,
    }),
  });
  const data = await response.json();
  return data;
};

const createGroupChat = async (creator, members, groupName) => {
  const url = `${apiUrl}/group-chat/create`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      creator,
      members,
      name: groupName,
    }),
  });
  const data = await response.json();
  return data;
};

export default { getUserChats, createChat, createGroupChat };
