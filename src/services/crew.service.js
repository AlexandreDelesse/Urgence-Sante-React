import { crewList } from '../data/crew.data'

const getCrewByCrewId = async (crewId) => {
  const crewidInt = parseInt(crewId)
  return new Promise((res, rej) => {
    const crew = crewList.find((crew) => crew.crewid === crewidInt)
    if (crew) res(crew)
    rej('Pas d équipage pour cet ID')
  })
}

export { getCrewByCrewId }
