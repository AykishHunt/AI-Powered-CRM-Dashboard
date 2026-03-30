import { useState, useContext } from "react"
import { registerUser } from "../services/authService"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { User, Mail, Lock, ArrowRight } from "lucide-react"

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const { login } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await registerUser(form)
      login(data)
      navigate("/dashboard")
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
   <div className="relative min-h-screen flex items-center justify-center bg-[#f4f6fa] dark:bg-[#0a0d14] overflow-hidden transition-colors duration-500">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-400/10 dark:bg-emerald-500/8 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-teal-400/10 dark:bg-teal-500/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-300/5 dark:bg-green-500/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10 blur-xl rounded-3xl" />

        <div className="relative bg-white/80 dark:bg-[#111520]/90 backdrop-blur-xl border border-gray-200/60 dark:border-white/[0.07] rounded-2xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none">

          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-4 shadow-lg shadow-emerald-500/25">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Create account
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started with CRMind today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Full name"
                required
                className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 dark:bg-[#0a0d14]/60 border border-gray-200 dark:border-white/[0.07] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 dark:bg-[#0a0d14]/60 border border-gray-200 dark:border-white/[0.07] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 dark:bg-[#0a0d14]/60 border border-gray-200 dark:border-white/[0.07] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create account <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-emerald-500 hover:text-emerald-400 transition-colors">
             Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
export default Signup