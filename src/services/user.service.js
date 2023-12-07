import usersData from '../data/users.data'

const login = ({ name }) => {
  const user = usersData.find((user) => user.name === name)
  if (!user) throw new Error('Aucun utilisateur trouvé')
  return user
}

const getUserDetail = ({ name }) => {
  return usersData.find((user) => user.name === name)
}

const storeToken = (token) => {
  window.localStorage.setItem('token', token)
}

const getToken = () => {
  const token = window.localStorage.getItem('token')
  return token || ''
}

const storeDrivers = (driversArray) => {
  const driversWithoutNull = driversArray.filter((el) => el !== null)
  window.localStorage.setItem('drivers', JSON.stringify(driversWithoutNull))
}

const getDrivers = () => {
  const driversAsString = window.localStorage.getItem('drivers')
  return JSON.parse(driversAsString)
}

export { login, getUserDetail, storeToken, getToken, storeDrivers, getDrivers }
