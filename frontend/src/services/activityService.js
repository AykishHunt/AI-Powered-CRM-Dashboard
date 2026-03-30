import api from "../utils/api"

export const getActivities = async (userId, isAdmin) => {
  const res = await api.get("/activities", {
    params: !isAdmin && userId ? { userId } : {}
  })
  return res.data
}