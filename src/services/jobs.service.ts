import { ShortJob } from "../models/ShortJob";
import { api } from "./api.config";

const getShortJobList = async (
  gCrewToken: string | null,
  showTerminated: boolean
): Promise<ShortJob[]> => {
  try {
    console.log("show terminated", showTerminated);
    if (!gCrewToken)
      throw new Error("Pas de token. Veuillez vous authentifier");
    const response = await api.get("/JobList", {
      params: { gCrewToken },
    });
    if (!showTerminated) return response.data;
    return response.data.filter((el: ShortJob) => el.isAck);
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
    return await api.get(`JobDetailEditable`, {
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
