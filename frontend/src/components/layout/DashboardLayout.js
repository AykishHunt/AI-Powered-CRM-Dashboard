
import Sidebar from "./Sidebar"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex dark:bg-gray-950 h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8">
        {children}
      </div>
    </div>
  )
}