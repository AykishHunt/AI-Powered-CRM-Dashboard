import { useState, useContext } from "react"
import { loginUser } from "../services/authService"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Home, Mail, Lock, ArrowRight } from "lucide-react"


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" })
   const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser(form)
      login(data);
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.response)
      alert(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-500/8 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-400/10 dark:bg-violet-500/8 blur-3xl" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-300/5 dark:bg-purple-500/5 blur-3xl" />

      </div>

      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <Home size={18} />
        <span>Back to home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease : [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 dark:from-blue-500/10 dark:to-violet-500/10 blur-xl rounded-3xl" /> 

        <div className="relative bg-white/80 dark:bg-[#111520]/90 backdrop-blur-xl border border-gray-200/60 dark:border-white/[0.07] rounded-2xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none"> 

        <div className="mb-8 text-center">
           <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 mb-4 shadow-lg shadow-blue-500/25">
          <span className="text-white font-bold text-lg">C</span>
           </div>       
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
          Welcome Back
        </h2>
         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Sign in to your CRMind account </p>
        </div> 

      <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="email"
          placeholder="Email address"
          required
          className="w-full pl-10 pr-4 py-3 text-sm  bg-gray-50 border border-gray-200 dark:border-white/[0.07] rounded-xl dark:bg-[#0a0d14]/60 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition placeholder-gray-400 dark:placeholder-gray-600"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /> </div>

        <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="password"
          placeholder="Password"
          className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 dark:bg-[#0a0d14]/60 border  border-gray-200 dark:border-white/[0.07] rounded-xl text-gray-900 dark:text-white   placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /> </div>

        <button
        type="submit"
        disabled = {loading}
        className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 text-white py-3 px-4  hover:from-blue-500 hover:to-violet-500 rounded-xl shadow-blue-500/20 hover:scale-[1.02] transition-all duration-200 shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none">
          {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign in <ArrowRight size={15} /></>
              )}
        </button> </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
            Sign up
          </Link>
        </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login