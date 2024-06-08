const getUserChats = async (userId) => {
  const url = `${window.location.protocol}//${window.location.hostname}/chats/${userId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const createChat = async (sender, receiver, date) => {
  const url = `${window.location.protocol}//${window.location.hostname}/chat/create`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender,
      receiver,
      date,
    }),
  });
  const data = await response.json();
  return data;
};

const createGroupChat = async (creator, members, groupName, date) => {
  const url = `${window.location.protocol}//${window.location.hostname}/group-chat/create`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      creator,
      members,
      name: groupName,
      date,
    }),
  });
  const data = await response.json();
  return data;
};

export default { getUserChats, createChat, createGroupChat };
