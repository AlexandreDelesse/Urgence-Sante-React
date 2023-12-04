import { Dispatch, SetStateAction, createContext } from "react";

interface IUserContext {
  hasLogged: boolean;
  setHasLogged: Dispatch<SetStateAction<boolean>>;
}

const defaultValue = {
  hasLogged: false,
  setHasLogged: () => {},
};

const UserContext = createContext<IUserContext>(defaultValue);

export default UserContext;
