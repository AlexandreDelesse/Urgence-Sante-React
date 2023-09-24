import { createContext } from "react";

const defaultValue = {
  user: {},
  hasAccess: false,
  setUser: () => {},
  hasLogged: false,
  setHasLogged: () => {},
};

const UserContext = createContext(defaultValue);

export default UserContext;
