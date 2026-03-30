import { useState, useContext, useCallback } from "react"
import { Edit, Trash2, CheckSquare, X, Eye } from "lucide-react"
import ConfirmModal from "./ConfirmModel"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { ContactContext } from "../context/contactContext"
import { restoreContact } from "../services/contactService"

const tagBg = {
  Client: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  Lead: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  VIP: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
}

export default function ContactsTable({ contacts = [], onEdit, admin = false }) {
  const { removeContact, fetchContacts } = useContext(ContactContext)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [lastDeletedId, setLastDeletedId] = useState(null)
  const [selected, setSelected] = useState([])
  const [bulkConfirmOpen, setBulkConfirmOpen] = useState(false)
  const [selectMode, setSelectMode] = useState(false)

  const handleDeleteClick = useCallback(contact => {
    setDeleteTarget(contact)
    setConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    try {
      await removeContact(deleteTarget._id)
      setLastDeletedId(deleteTarget._id)
      setDeleteTarget(null)
      setConfirmOpen(false)
      toast(
        (t) => (
          <span className="flex items-center gap-3 text-sm">
            Contact deleted
            <button
              onClick={async () => {
                try {
                  await restoreContact(lastDeletedId || deleteTarget._id)
                  await fetchContacts()
                  toast.dismiss(t.id)
                  toast.success("Contact restored")
                } catch {
                  toast.error("Undo failed")
                }
              }}
              className="font-semibold text-blue-500 hover:text-blue-400 transition-colors"
            >
              Undo
            </button>
          </span>
        ),
        { duration: 5000 }
      )
    } catch {
      toast.error("Delete failed")
    }
  }

  const handleSelectAll = useCallback(
    (e) => setSelected(e.target.checked ? contacts.map(c => c._id) : []),
    [contacts]
  )

  const handleSelectOne = useCallback((id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }, [])

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selected.map(id => removeContact(id)))
      toast.success(`${selected.length} contacts deleted`)
      setSelected([])
      setBulkConfirmOpen(false)
      setSelectMode(false)
    } catch {
      toast.error("Bulk delete failed")
    }
  }

  const exitSelectMode = useCallback(() => {
    setSelectMode(false)
    setSelected([])
  }, [])

  const allSelected = contacts.length > 0 && selected.length === contacts.length

  return (
    <>
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {selectMode && contacts.length > 0
            ? `${selected.length} of ${contacts.length} selected`
            : `${contacts.length} contact${contacts.length !== 1 ? "s" : ""}`}
        </p>
        <div className="flex items-center gap-3">
          {!selectMode ? (
            <button
              onClick={() => setSelectMode(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <CheckSquare size={14} /> Select
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={exitSelectMode}
                className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={13} /> Cancel
              </button>
              {selected.length > 0 && (
                <button
                  onClick={() => setBulkConfirmOpen(true)}
                  className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Trash2 size={13} /> Delete ({selected.length})
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#111520]">
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center">
            <CheckSquare size={20} className="text-gray-300 dark:text-gray-600" />
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500">No contacts found</p>
        </div>
      ) : (
        <>
          <div className="hidden sm:block rounded-xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#111520] overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/[0.07] bg-gray-50/50 dark:bg-white/[0.02]">
                  {selectMode && (
                    <th className="p-3.5 w-10">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={handleSelectAll}
                        className="w-3.5 h-3.5 accent-blue-500 cursor-pointer rounded"
                      />
                    </th>
                  )}
                  <th className="p-3.5 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="p-3.5 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Tags</th>
                  {admin && (
                    <th className="p-3.5 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">User</th>
                  )}
                  <th className="p-3.5 text-center text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/[0.04]">
                {contacts.map(c => (
                  <tr
                    key={c._id}
                    className={`group transition-colors ${
                      selected.includes(c._id)
                        ? "bg-blue-50/50 dark:bg-blue-500/5"
                        : "hover:bg-gray-50/60 dark:hover:bg-white/[0.02]"
                    }`}
                  >
                    {selectMode && (
                      <td className="p-3.5">
                        <input
                          type="checkbox"
                          checked={selected.includes(c._id)}
                          onChange={() => handleSelectOne(c._id)}
                          className="w-3.5 h-3.5 accent-blue-500 cursor-pointer rounded"
                        />
                      </td>
                    )}
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {c.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{c.name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {c.tags?.map((tag, idx) => (
                          <span key={idx} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagBg[tag] || "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    {admin && (
                      <td className="p-3.5 text-sm text-gray-500 dark:text-gray-400">
                        {c.userId?.name || "Unknown"}
                      </td>
                    )}
                    <td className="p-3.5">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          to={`/contacts/${c._id}`}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          onClick={() => onEdit(c)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(c)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden flex flex-col gap-3">
            {contacts.map(c => (
              <div
                key={c._id}
                className={`rounded-xl border bg-white dark:bg-[#111520] p-4 transition-colors ${
                  selected.includes(c._id)
                    ? "border-blue-200 dark:border-blue-500/30 bg-blue-50/30 dark:bg-blue-500/5"
                    : "border-gray-100 dark:border-white/[0.07]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {selectMode && (
                      <input
                        type="checkbox"
                        checked={selected.includes(c._id)}
                        onChange={() => handleSelectOne(c._id)}
                        className="w-3.5 h-3.5 accent-blue-500 cursor-pointer rounded flex-shrink-0 mt-1"
                      />
                    )}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {c.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{c.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{c.email}</p>
                      {c.phone && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">{c.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link
                      to={`/contacts/${c._id}`}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"
                    >
                      <Eye size={14} />
                    </Link>
                    <button
                      onClick={() => onEdit(c)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(c)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags?.map((tag, idx) => (
                      <span key={idx} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagBg[tag] || "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {admin && c.userId?.name && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">{c.userId.name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
      />
      <ConfirmModal
        isOpen={bulkConfirmOpen}
        onClose={() => setBulkConfirmOpen(false)}
        onConfirm={handleBulkDelete}
        message={`Delete ${selected.length} contact${selected.length > 1 ? "s" : ""}? This can't be undone.`}
      />
    </>
  )
}