import api from "../utils/api"

export const getUsers = async () => {
  try {
    const res = await api.get("/users")
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw error
  }
}