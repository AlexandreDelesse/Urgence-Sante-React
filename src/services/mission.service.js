import { INFOS_CLIENTS } from "../data/clientInfos.data";
import { api } from "./api.config";
import { getToken } from "./user.service";

const getMissions = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("Pas de token. Veuillez vous authentifier");
    const { data: missions } = await api.get("/JobList", {
      params: { gCrewToken: token },
    });
    return typeof missions === "object" ? missions : [];
  } catch (error) {
    throw error;
  }
};

const getMissionById = async (jobId) => {
  try {
    const { data: jobDetail } = await api.get(`/JobDetail/${jobId}`);
    jobDetail.infosClient = INFOS_CLIENTS;
    return jobDetail;
  } catch (error) {
    throw error;
  }
};

const getJobDetailEditableFromJobId = async (jobId) => {
  try {
    const { data: jobDetailEditable } = await api.get(`JobDetailEditable`, {
      params: { gJobId: jobId },
    });
    return jobDetailEditable;
  } catch (error) {
    throw error;
  }
};

const patchJobDetailEditable = async (jobDetailEditable) => {
  try {
    await api.patch("JobDetailEditable", jobDetailEditable);
  } catch (error) {
    throw error;
  }
};

const acceptMission = async (missionId) => {
  try {
    return await api.patch("/joblist", {
      jobId: missionId,
      acknowledged: true,
    });
  } catch (error) {
    throw error;
  }
};

export {
  getMissions,
  getMissionById,
  acceptMission,
  getJobDetailEditableFromJobId,
  patchJobDetailEditable,
};
