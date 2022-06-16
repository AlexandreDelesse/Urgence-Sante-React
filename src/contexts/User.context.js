import { createContext } from "react";

const defaultValue = {
  user: null,
  setUser: () => {},
};

const UserContext = createContext(defaultValue);

export default UserContext;
