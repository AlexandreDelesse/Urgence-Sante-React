import { api } from "./api.config";
import { getToken } from "./user.service";

const getJobList = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("Pas de token. Veuillez vous authentifier");
    const { data: jobList } = await api.get("/JobList", {
      params: { gCrewToken: token },
    });
    return typeof jobList === "object" ? jobList : [];
    // return testJobList;
  } catch (error) {
    throw error;
  }
};

const ackJobById = async (jobId) => {
  try {
    await api.patch("/joblist", {
      jobId,
      acknowledged: true,
    });
    return;
  } catch (error) {
    throw error;
  }
};

const getJobDetailById = async (jobId) => {
  try {
    const { data: jobDetail } = await api.get(`/JobDetail/${jobId}`);
    return jobDetail;
  } catch (error) {
    throw error;
  }
};

const getJobStatusById = async (jobId) => {
  try {
    const { data: missionStatus } = await api.get(`Time/${jobId}`);
    if (
      missionStatus.go &&
      missionStatus.go.charAt(missionStatus.go.length - 1) !== "Z"
    )
      missionStatus.go = missionStatus.go + "Z";
    if (
      missionStatus.onSite &&
      missionStatus.go.charAt(missionStatus.onSite.length - 1) !== "Z"
    )
      missionStatus.onSite = missionStatus.onSite + "Z";
    if (
      missionStatus.available &&
      missionStatus.available.charAt(missionStatus.available.length - 1) !== "Z"
    )
      missionStatus.available = missionStatus.available + "Z";
    return missionStatus;
  } catch (error) {
    throw error;
  }
};

const getJobDetailEditableById = async (jobId) => {
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

export {
  getJobList,
  ackJobById,
  getJobDetailById,
  getJobStatusById,
  getJobDetailEditableById,
  patchJobDetailEditable,
};
