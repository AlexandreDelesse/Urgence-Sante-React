import { createContext } from "react";

const defaultValue = {
  user: {
    name: "Alexandre",
  },
  setUser: () => {},
};

const UserContext = createContext(defaultValue);

export default UserContext;
