import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { ThemeContext } from "../context/ThemeContext"
import { ContactContext } from "../context/contactContext"

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext)
  const { toggleTheme } = useContext(ThemeContext)
  const { resetContacts} = useContext(ContactContext)

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          Dashboard
        </h1>

        <div className="flex gap-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
          >
            Toggle Theme
          </button>

          <button
            onClick={() => {
              resetContacts()
              logout()
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <p className="dark:text-white">
          Welcome, {user?.name} 
        </p>
      </div>
    </div>
  )
}

export default Dashboard