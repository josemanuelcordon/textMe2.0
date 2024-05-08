const URL = "http://localhost:3000/login";

const authUser = async (telephone, password) => {
  const response = await fetch(URL, {
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

export default {
  authUser,
};
