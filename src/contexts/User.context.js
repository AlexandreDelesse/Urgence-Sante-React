import { createContext } from "react";

const defaultValue = {
  user: {},
  setUser: () => {},
};

const UserContext = createContext(defaultValue);

export default UserContext;
