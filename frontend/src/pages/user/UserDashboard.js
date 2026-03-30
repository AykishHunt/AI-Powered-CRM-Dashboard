import { useEffect, useState } from "react"
import DashboardLayout from "../../components/layout/DashboardLayout"
import { getStats } from "../../services/dashboardService"
import { Users, Tag, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "../../context/AuthContext"
import ActivityLog from "../../components/ActivityLog"

const tagColors = {
  Client: "from-blue-500 to-blue-700",
  Lead: "from-violet-500 to-violet-700",
  VIP: "from-amber-500 to-orange-600",
}

const tagBg = {
  Client: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300 border border-blue-200/60 dark:border-blue-500/20",
  Lead: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300 border border-violet-200/60 dark:border-violet-500/20",
  VIP: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 border border-amber-200/60 dark:border-amber-500/20",
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] } })
}

export default function UserDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-64">
        <div className="w-9 h-9 border-[3px] border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    </DashboardLayout>
  )

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8 p-7 rounded-2xl overflow-hidden bg-[#111520] dark:bg-[#111520] border border-white/[0.07]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-violet-600/15 to-transparent pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative">
          <p className="text-xs font-semibold tracking-widest text-blue-400/70 uppercase mb-2">Dashboard</p>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Welcome back, <span className="text-blue-400">{user?.name?.split(" ")[0]}</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Here's a summary of your contacts and recent activity.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative p-5 rounded-xl bg-white dark:bg-[#111520] border border-gray-100 dark:border-white/[0.07] shadow-sm overflow-hidden group hover:border-blue-200 dark:hover:border-blue-500/20 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">My Contacts</p>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <Users size={15} className="text-blue-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stats?.total ?? 0}</p>
          <div className="mt-3 h-1 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
          </div>
        </motion.div>

        {Object.entries(stats?.byTag || {}).map(([tag, count], i) => (
          <motion.div
            key={tag}
            custom={i + 1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative p-5 rounded-xl bg-white dark:bg-[#111520] border border-gray-100 dark:border-white/[0.07] shadow-sm overflow-hidden group hover:border-blue-200 dark:hover:border-blue-500/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{tag}</p>
              <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center">
                <Tag size={15} className="text-violet-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{count}</p>
            <div className="mt-3 h-1 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${tagColors[tag] || "from-gray-400 to-gray-500"} rounded-full`} style={{ width: `${Math.min(100, (count / (stats?.total || 1)) * 100)}%` }} />
            </div>
          </motion.div>
        ))}
      </div>

      {stats?.lastEdited && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 rounded-xl bg-white dark:bg-[#111520] border border-gray-100 dark:border-white/[0.07] shadow-sm mb-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <Clock size={14} className="text-blue-500" />
            </div>
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Last Edited Contact</h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {stats.lastEdited.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{stats.lastEdited.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{stats.lastEdited.email}</p>
                {stats.lastEdited.company && (
                  <p className="text-xs text-gray-400 dark:text-gray-500">{stats.lastEdited.company}</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {stats.lastEdited.tags?.map(tag => (
                <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-medium ${tagBg[tag]}`}>{tag}</span>
              ))}
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Last updated</p>
              <p className="text-sm font-semibold text-blue-500 dark:text-blue-400">
                {new Date(stats.lastEdited.updatedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <ActivityLog />
      </motion.div>
    </DashboardLayout>
  )
}