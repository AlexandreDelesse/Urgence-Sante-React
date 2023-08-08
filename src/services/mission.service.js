import { mission, missions } from '../data/mission.data'
import { api } from './api.config'

const getMissions = async () => {
  try {
    const { data: missions } = await api.get('/JobList', {
      params: { gCrewToken: 'e0b21321-3990-4f69-8502-d2c4f494a882' },
    })

    return missions
  } catch (error) {
    throw error
  }
}

const getMissionById = async (jobId) => {
  try {
    const { data: jobDetail } = await api.get('/jobDetail', {
      params: { gJobId: jobId },
    })
    return jobDetail
  } catch (error) {
    throw error
  }
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
