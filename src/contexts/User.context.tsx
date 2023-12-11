import { Dispatch, SetStateAction, createContext } from 'react'
import ILoginResponse from '../interfaces/ILoginResponse'

interface IUserContext {
  hasLogged: boolean
  setHasLogged: Dispatch<SetStateAction<boolean>>
  crew: ILoginResponse | null
  setCrew: Dispatch<SetStateAction<ILoginResponse | null>>
  getToken: () => string | null
}

const defaultValue = {
  hasLogged: false,
  setHasLogged: () => {},
  crew: null,
  setCrew: () => {},
  getToken: () => null,
}

const UserContext = createContext<IUserContext>(defaultValue)

export default UserContext
