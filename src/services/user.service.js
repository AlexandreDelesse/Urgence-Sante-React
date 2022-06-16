import usersData from "../data/users.data";

const login = ({ name }) => {
  const user = usersData.find((user) => user.name === name);
  if (!user) throw new Error("Aucun utilisateur trouvé");
  return user;
};

const getUserDetail = ({ name }) => {
  return usersData.find((user) => user.name === name);
};

export { login, getUserDetail };
