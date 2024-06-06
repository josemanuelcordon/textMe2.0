function User() {
  this.id = null;
  this.username = null;
  this.email = null;
  this.password = null;
  this.is_banned = 0;
  this.active = 1;
  this.role = USER_ROLE["USER"];
}

const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export { USER_ROLE, User };
