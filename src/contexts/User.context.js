import { createContext } from "react";

const defaultValue = {
  user: {},
  hasAccess: false,
  setUser: () => {},
  setHasAccess: () => {},
};

const UserContext = createContext(defaultValue);

export default UserContext;
