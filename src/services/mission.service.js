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
    const { data: jobDetail } = await api.get("/jobDetail", {
      params: { gJobId: jobId },
      // headers: {
      //   Authorization: getToken(),
      // },
    });
    return jobDetail;
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

export { getMissions, getMissionById, acceptMission };
