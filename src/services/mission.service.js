import { mission, missions } from '../data/mission.data'
import { api } from './api.config'

const getMissions = async () => {
  //   const missions = await api.get('/JobList', {
  //     params: { gCrewToken: 'e0b21321-3990-4f69-8502-d2c4f494a882' },
  //   })
  //   console.log('missions :', missions)
  return await promiseMissions
}

const getMissionById = async (jobId) => {
  const thePromise = new Promise((res, rej) => {
    const theMission = missions.find(
      (el) => parseInt(el.index) === parseInt(jobId),
    )
    if (theMission) res(theMission)
    else rej('An Error')
  })
  return await thePromise
}

const promiseMissions = new Promise((res, rej) => {
  setTimeout(() => {
    res(missions)
  }, 500)
})

const promiseMissionDetail = new Promise((res, rej) => {
  setTimeout(() => {
    res(mission)
  }, 500)
})

export { getMissions, getMissionById }
