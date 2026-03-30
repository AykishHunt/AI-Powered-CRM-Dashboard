import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-white/[0.06] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">CRMind</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">AI-Powered</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400 dark:text-gray-500">
            <Link to="/login" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Login</Link>
            <Link to="/signup" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Sign up</Link>
          </div>

          <div className="text-xs text-gray-400 dark:text-gray-500 text-center md:text-right">
            <p>Built with React · Node.js · MongoDB</p>
            <p className="mt-1">© {new Date().getFullYear()} CRMind. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}