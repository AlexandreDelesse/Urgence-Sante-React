import { api } from './api.config'

const createNewPatient = async ({
  firstname,
  lastname,
  ddn,
  contactId,
  jobId,
}) => {
  try {
    return await api.put(
      '/JobEdit',
      {
        firstName: firstname,
        lastName: lastname,
        ddn,
        contactId,
      },
      {
        params: { gJobId: contactId },
      },
    )
  } catch (error) {
    throw error
  }
}

export { createNewPatient }
