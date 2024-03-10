import { ShortJob } from "../models/ShortJob";
import { api } from "./api.config";
import { getGCrewToken } from "./crew.service";

const JOB_DETAIL_EDIT = 'JobEdit'

const getShortJobList = async (
  showTerminated: boolean
): Promise<ShortJob[]> => {
  try {
    const gCrewToken = getGCrewToken();
    if (!gCrewToken)
      throw new Error("Pas de token. Veuillez vous authentifier");
    const response = await api.get("/JobList", {
      params: { gCrewToken },
    });
    console.log(showTerminated);
    if (showTerminated) return response.data;
    return response.data.filter((el: ShortJob) => !el.isTerminated);
  } catch (error) {
    throw error;
  }
};

const aknoloedgeJob = async (jobId: string) => {
  try {
    return await api.patch("/joblist", {
      jobId,
      acknowledged: true,
    });
  } catch (error) {
    throw error;
  }
};

const getJobDetail = async (jobId: string) => {
  try {
    return await api.get(`/JobDetail/${jobId}`);
  } catch (error) {
    throw error;
  }
};

const getMissionStatus = async (jobId: string) => {
  try {
    return await api.get(`Time/${jobId}`);
  } catch (error) {
    throw error;
  }
};

const getJobDetailEditable = async (jobId: string) => {
  try {
    return await api.get(JOB_DETAIL_EDIT, {
      params: { gJobId: jobId },
    });
  } catch (error) {
    throw error;
  }
};

export {
  getShortJobList,
  aknoloedgeJob,
  getJobDetail,
  getMissionStatus,
  getJobDetailEditable,
};
