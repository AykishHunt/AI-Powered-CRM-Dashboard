import { createContext, useState, useEffect } from "react"
import { getActivities } from "../services/activityService"
import { useAuth } from "../context/AuthContext"

export const ActivityContext = createContext()

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const data = await getActivities(user?._id, user?.role === "admin")
      setActivities(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchActivities()
  }, [user])

  return (
    <ActivityContext.Provider value={{ activities, loading, fetchActivities }}>
      {children}
    </ActivityContext.Provider>
  )
}