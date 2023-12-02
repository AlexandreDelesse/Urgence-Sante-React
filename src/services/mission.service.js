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
    // const { data: jobDetail } = await api.get(`/JobDetail/${jobId}`);
    const jobDetail = {
      phones: ["string"],
      transportMode: "string",
      isSerial: true,
      transportSens: 0,
      schedule: "string",
      appointment: "string",
      departure: "string",
      arrival: "string",
      comments: "string",
      isLastDay: true,
      contactId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      patient: {
        contactId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        lastName: "string",
        firstName: "string",
        completeName: "x",
        ddn: "2023-11-30T12:22:19.162Z",
        age: "string",
      },
    };
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

const getMissionStatus = async (jobId) => {
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

const updateMissionStatus = async (status) => {
  const statusToSend = { jobId: status.jobId };
  Object.keys(status.step).forEach((key) => {
    statusToSend[key] = status.step[key]
      ? status.step[key].toISOString()
      : null;
  });

  try {
    return await api.patch("/Time", statusToSend);
  } catch (error) {
    throw error;
  }
};

const getSignature = async (gJobId) => {
  try {
    const { data: signature } = await api.get("Signature", {
      params: { gJobId },
    });
    return signature;
  } catch (error) {
    throw error;
  }
};

const putSignature = async (signature) => {
  try {
    await api.put("Signature", signature);
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
  updateMissionStatus,
  getMissionStatus,
  getSignature,
  putSignature,
};
