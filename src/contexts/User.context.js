import { createContext } from "react";

const defaultValue = {
  user: {},
  setUser: () => {},
  hasLogged: false,
  setHasLogged: () => {},
};

const UserContext = createContext(defaultValue);

export default UserContext;
