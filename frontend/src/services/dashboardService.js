import api from "../utils/api"

export const getStats = async () => {
  try {
    const res = await api.get("/contacts/stats")
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw error
  }
}