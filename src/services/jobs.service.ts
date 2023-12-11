import { api } from './api.config'

const getShortJobList = async (gCrewToken: string | null) => {
  try {
    if (!gCrewToken) throw new Error('Pas de token. Veuillez vous authentifier')
    return await api.get('/JobList', {
      params: { gCrewToken },
    })
  } catch (error) {
    throw error
  }
}

const aknoloedgeJob = async (jobId: string) => {
  try {
    return await api.patch('/joblist', {
      jobId,
      acknowledged: true,
    })
  } catch (error) {
    throw error
  }
}

const getJobDetail = async (jobId: string) => {
  try {
    return await api.get(`/JobDetail/${jobId}`)
  } catch (error) {
    throw error
  }
}

const getMissionStatus = async (jobId: string) => {
  try {
    return await api.get(`Time/${jobId}`)
  } catch (error) {
    throw error
  }
}

const getJobDetailEditable = async (jobId: string) => {
  try {
    return await api.get(`JobDetailEditable`, {
      params: { gJobId: jobId },
    })
  } catch (error) {
    throw error
  }
}

export {
  getShortJobList,
  aknoloedgeJob,
  getJobDetail,
  getMissionStatus,
  getJobDetailEditable,
}
