const URL = "http://localhost:3000";

const authUser = async (telephone, password) => {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      telephone: parseInt(telephone),
      password,
    }),
  });

  const data = await response.json();
  return data;
};

const findUserByName = async (name) => {
  const response = await fetch(`${URL}/user?name=${name}`);
  const data = await response.json();
  return data;
};

const getUserFriends = async (id) => {
  const response = await fetch(`${URL}/user/${id}/friends`);
  const friends = await response.json();
  return friends;
};

export default {
  authUser,
  findUserByName,
  getUserFriends,
};
