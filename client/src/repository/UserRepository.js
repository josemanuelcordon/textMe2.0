const URL = "http://localhost:3000";

const authUser = async (username, password) => {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
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

const createUser = async (username, email, password) => {
  const response = await fetch(`${URL}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Usuario ya existente");
  }

  const data = await response.json();
  return data;
};

export default {
  authUser,
  findUserByName,
  getUserFriends,
  createUser,
};
