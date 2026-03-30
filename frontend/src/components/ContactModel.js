import { useState, useEffect } from "react"
import { X, User, Mail, Phone, Building2, FileText, Tag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactModal({ isOpen, onClose, contact, users = [], admin = false, addContact, editContact }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", notes: "", tag: "", userId: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
        company: contact.company || "",
        notes: contact.notes || "",
        tag: contact.tags?.[0] || "",
        userId: contact.userId?._id || "",
      })
    } else {
      setFormData({ name: "", email: "", phone: "", company: "", notes: "", tag: "", userId: "" })
    }
    setError("")
  }, [contact, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const payload = { ...formData, tags: formData.tag ? [formData.tag] : [] }
      if (contact) await editContact(contact._id, payload)
      else await addContact(payload)
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-[#0a0d14]/60 border border-gray-200 dark:border-white/[0.07] rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition"

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-white dark:bg-[#111520] border border-gray-100 dark:border-white/[0.07] rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/[0.07]">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {contact ? "Edit Contact" : "Add Contact"}
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {contact ? "Update the contact details below" : "Fill in the details to create a contact"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
              >
                <X size={15} />
              </button>
            </div>

            <div className="px-6 py-5">
              {error && (
                <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-xs font-medium text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required className={inputClass} />
                </div>

                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="email" type="email" placeholder="Email address" value={formData.email} onChange={handleChange} required className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="relative">
                  <FileText size={14} className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="notes"
                    placeholder="Notes..."
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-[#0a0d14]/60 border border-gray-200 dark:border-white/[0.07] rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition resize-none"
                  />
                </div>

                <div className="relative">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/[0.07] rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition appearance-none"
                  >
                    <option value="">Select tag</option>
                    <option value="Client">Client</option>
                    <option value="Lead">Lead</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>

                {admin && (
                  <select
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/[0.07] rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition appearance-none"
                  >
                    <option value="">Assign to user</option>
                    {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                  </select>
                )}

                <div className="pt-1 flex gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/[0.07] rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {contact ? "Updating..." : "Adding..."}
                      </span>
                    ) : (
                      contact ? "Update Contact" : "Add Contact"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}