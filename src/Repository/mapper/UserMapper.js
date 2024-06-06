import { User, USER_ROLE } from "../../Model/User";

const toDto = (user) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
  };
};

const toModel = (userDto) => {
  if (!userDto) {
    return null;
  }

  const user = new User();

  user.id = userDto.id;
  user.username = userDto.username;
  user.email = userDto.email;
  user.is_banned = userDto.is_banned;
  user.active = userDto.active;
  user.role = USER_ROLE[userDto.role];

  return user;
};

export default { toDto, toModel };
