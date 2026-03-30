import { useContext } from "react"
import { ActivityContext } from "../context/ActivityContext"
import { CheckCircle, Pencil, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

const actionConfig = {
  created: {

    icon: <CheckCircle size={16} />,
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-600 dark:text-green-300",
    label: "Created"

  },
  updated: {

    icon: <Pencil size={16} />,
    bg: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-600 dark:text-blue-300",
    label: "Updated"

  },
  deleted: {

    icon: <Trash2 size={16} />,
    bg: "bg-red-100 dark:bg-red-900",
    text: "text-red-600 dark:text-red-300",
    label: "Deleted"

  }
}

const timeAgo = date => {

  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
  
}

export default function ActivityLog() {
  const { activities, loading } = useContext(ActivityContext)

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
      <h2 className="text-lg font-bold dark:text-white mb-4">Recent Activity</h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : activities.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">No activity yet</p>
      ) : (
        <ul className="space-y-3">
          {activities.map((activity, i) => {
            const config = actionConfig[activity.action]
            return (
              <motion.li
                key={activity._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className={`p-2 rounded-full ${config.bg} ${config.text} shrink-0`}>
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-200 truncate">
                    <span className="font-semibold">{activity.userId?.name}</span> {config.label.toLowerCase()} <span className="font-semibold">{activity.contactName}</span>
                  </p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{timeAgo(activity.createdAt)}</span>
              </motion.li>
            )
          })}
        </ul>
      )}
    </div>
  )
}