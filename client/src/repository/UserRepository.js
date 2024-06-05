const apiUrl = import.meta.env.VITE_API_URL;

const authUser = async (username, password) => {
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const data = await response.json();
  return data;
};

const findUserByName = async (name) => {
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/user?name=${name}`
  );
  const data = await response.json();
  return data;
};

const getUserFriends = async (id) => {
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/user/${id}/friends`
  );
  const friends = await response.json();
  return friends;
};

const createUser = async (username, email, password) => {
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/user/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Usuario ya existente");
  }

  const data = await response.json();
  return data;
};

const enableAccount = async (userId) => {
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/user/${userId}/enable`,
    {
      method: "PUT",
    }
  );

  if (!response.ok) {
    throw new Error("No se pudo habilitar la cuenta");
  }
};

const unableAccount = async (userId) => {
  const response = await fetch(
    `${window.location.protocol}//${window.location.hostname}/user/${userId}/unable`,
    {
      method: "PUT",
    }
  );

  if (!response.ok) {
    throw new Error("No se pudo deshabilitar la cuenta");
  }
};

export default {
  authUser,
  findUserByName,
  getUserFriends,
  createUser,
  enableAccount,
  unableAccount,
};
