import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, LogOut, Moon, Sun, ChevronRight } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { useNavigate } from "react-router-dom"

export default function Sidebar() {
  const { user, setUser } = useAuth()
  const { dark, toggleTheme } = useContext(ThemeContext)
  const location = useLocation()
  const navigate = useNavigate()

  const menu = [
    {
      name: "Dashboard",
      path: user?.role === "admin" ? "/admin" : "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Contacts",
      path: user?.role === "admin" ? "/admin/contacts" : "/dashboard/contacts",
      icon: Users,
    },
  ]

  const initials = user?.name
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="w-64 h-screen bg-white dark:bg-[#111520] border-r border-gray-100 dark:border-white/[0.07] flex flex-col">
      <div className="px-5 py-5 border-b border-gray-100 dark:border-white/[0.07]">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md shadow-blue-500/20 flex-shrink-0">
            <span className="text-white font-bold text-xs">C</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">CRMind</span>
            <span className="text-blue-500 text-xs font-normal ml-1">AI</span>
          </div>
        </Link>
      </div>

      <div className="px-3 pt-4 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 px-2 mb-2">
          Navigation
        </p>
        <div className="flex flex-col gap-0.5">
          {menu.map(item => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                  active
                    ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 rounded-r-full" />
                )}
                <item.icon
                  size={16}
                  className={active ? "text-blue-500" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"}
                />
                <span className="flex-1">{item.name}</span>
                {active && <ChevronRight size={13} className="text-blue-400 opacity-60" />}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="px-3 pb-4 space-y-0.5">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-white transition-all"
        >
          {dark ? (
            <Sun size={16} className="text-amber-400" />
          ) : (
            <Moon size={16} className="text-gray-400" />
          )}
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

        <button
          onClick={() => {
            setUser(null)
            navigate("/login", { replace: true })
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all group"
        >
          <LogOut size={16} className="group-hover:text-red-500 transition-colors" />
          Logout
        </button>

        <div className="mx-1 mt-3 pt-3 border-t border-gray-100 dark:border-white/[0.07]">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 capitalize">{user?.role}</p>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  )
}