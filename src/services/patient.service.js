import { api } from "./api.config";

const createNewPatient = async ({ firstname, lastname, ddn, contactId, jobId }) => {
  console.log(firstname, lastname, ddn);
  try {
    return await api.put(
      "/JobDetailEditable",
      {
        firstName: firstname,
        lastName: lastname,
        ddn,
        contactId,
      },
      {
        params: { gJobId: contactId },
      }
    );
  } catch (error) {
    throw error;
  }
};

export { createNewPatient };
