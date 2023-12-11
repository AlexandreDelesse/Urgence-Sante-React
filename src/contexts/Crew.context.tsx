import { Dispatch, SetStateAction, createContext } from 'react'
import { ICrew } from '../interfaces/ICrew'

interface ICrewContext {
  crew: ICrew | null
  setCrew: Dispatch<SetStateAction<ICrew | null>>
}

const defaultValue = {
  crew: null,
  setCrew: () => {},
}

const CrewContext = createContext<ICrewContext>(defaultValue)

export default CrewContext
