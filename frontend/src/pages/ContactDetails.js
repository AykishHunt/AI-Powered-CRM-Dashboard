import { useContext, useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Sparkles, Mail, Phone, User, Building2, Tag, Clock } from "lucide-react"
import { ContactContext } from "../context/contactContext"
import { motion, AnimatePresence } from "framer-motion"

const tagBg = {
  Client: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300 border border-blue-200/60 dark:border-blue-500/20",
  Lead: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300 border border-violet-200/60 dark:border-violet-500/20",
  VIP: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 border border-amber-200/60 dark:border-amber-500/20",
}

export default function ContactDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { contacts, fetchContacts, loading, } = useContext(ContactContext)
  const [contact, setContact] = useState(null)
  const [summary, setSummary] = useState("")
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [summaryError, setSummaryError] = useState("")

  useEffect(() => {
    if (!contacts.length) fetchContacts()
  }, [])

  useEffect(() => {
    const found = contacts.find(c => c._id === id)
    setContact(found || null)
  }, [contacts, id])

  const handleGenerateSummary = useCallback(async () => {
    if (!contact?.notes?.trim()) {
      setSummaryError("This contact has no notes to summarize.")
      return
    }
    setSummaryLoading(true)
    setSummaryError("")
    setSummary("")
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Summarize the following contact notes in 2-3 clear and concise sentences:\n\n${contact.notes}` }] }]
          })
        }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error?.message || "Failed to generate summary")
      setSummary(data.candidates[0].content.parts[0].text)
    } catch (err) {
      setSummaryError(err.message || "Something went wrong")
    } finally {
      setSummaryLoading(false)
    }
  }, [contact])

  if (loading || !contact) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-9 h-9 border-[3px] border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="dark:bg-slate-900 h-screen w-screen mx-auto px-4 py-8 space-y-4">

      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors group"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to contacts
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative p-6 rounded-2xl bg-white dark:bg-[#111520] border border-gray-100 dark:border-white/[0.07] overflow-hidden shadow-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50/50 to-transparent dark:from-blue-600/20 dark:via-violet-600/15 dark:to-transparent pointer-events-none rounded-2xl" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100/60 dark:bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg shadow-blue-500/20">
            {contact.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">{contact.name}</h1>
            <p className="text-sm text-gray-400 dark:text-gray-400 mt-0.5">{contact.company || "No company"}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {contact.tags?.map(tag => (
                <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-medium ${tagBg[tag] || "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-5 pt-5 border-t border-gray-100 dark:border-white/[0.07] grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
              <Mail size={13} className="text-blue-500 dark:text-gray-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Email</p>
              <p className="text-xs text-gray-700 dark:text-gray-200 truncate">{contact.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
              <Phone size={13} className="text-violet-500 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Phone</p>
              <p className="text-xs text-gray-700 dark:text-gray-200">{contact.phone || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
              <User size={13} className="text-emerald-500 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Owner</p>
              <p className="text-xs text-gray-700 dark:text-gray-200">{contact.userId?.name || "Unknown"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
              <Clock size={13} className="text-amber-500 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Added</p>
              <p className="text-xs text-gray-700 dark:text-gray-200">
                {contact.createdAt
                  ? new Date(contact.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl bg-white dark:bg-[#111520] border border-gray-100 dark:border-white/[0.07] overflow-hidden shadow-sm"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.07]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gray-50 dark:bg-white/5 flex items-center justify-center">
              <Tag size={12} className="text-gray-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Notes</h2>
          </div>
          <button
            onClick={handleGenerateSummary}
            disabled={summaryLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 border border-violet-200/60 dark:border-violet-500/20 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-500/20 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            <Sparkles size={12} />
            {summaryLoading ? "Generating..." : "AI Summary"}
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {contact.notes || (
              <span className="italic text-gray-300 dark:text-gray-600">No notes added yet.</span>
            )}
          </p>

          <AnimatePresence>
            {summaryError && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 px-3 py-2.5 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20"
              >
                <p className="text-xs text-red-600 dark:text-red-400">{summaryError}</p>
              </motion.div>
            )}

            {summaryLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]"
              >
                <div className="w-4 h-4 border-[2px] border-blue-500/30 border-t-blue-500 rounded-full animate-spin flex-shrink-0" />
                <p className="text-xs text-gray-400 dark:text-gray-500">Asking AI to summarize...</p>
              </motion.div>
            )}

            {summary && !summaryLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-500/8 dark:to-blue-500/8 border border-violet-100 dark:border-violet-500/15 p-4"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-5 h-5 rounded-md bg-violet-100 text-black dark:bg-violet-500/20 flex items-center justify-center">
                    <Sparkles size={11} className="text-violet-500" />
                  </div>
                  <p className="text-xs font-semibold text-violet-600 dark:text-violet-700 uppercase tracking-wide">AI Summary</p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-900 leading-relaxed">{summary}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}