import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import ContactsTable from '../components/ContactTable'
import ContactModal from '../components/ContactModel'
import { getUsers } from '../services/userService'
import toast, { Toaster } from 'react-hot-toast'
import { ContactContext } from '../context/contactContext'
import useDebounce from '../hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'

export default function Contacts({ admin = false }) {

  const { contacts, loading, addContact, editContact, fetchContacts} = useContext(ContactContext)
  const [users, setUsers] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const tagFilter = searchParams.get('tag') || ''

  const debouncedSearch = useDebounce(search, 300)

  const fetchUsersList = useCallback(async () => {
  try {
    const data = await getUsers()
    setUsers(data)
  } catch (err) {
    console.error(err)
    toast.error('Failed to fetch users')
  }
  }, [])

  useEffect(() => {
    if (admin) fetchUsersList()
  }, [admin])

  const filteredContacts = useMemo(() => {
  let data = [...contacts]
  if (debouncedSearch.trim()) {
    const q = debouncedSearch.toLowerCase()
    data = data.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    )
  }
    if (tagFilter) {
    data = data.filter(c => c.tags?.includes(tagFilter))
    }
    return data
  }, [debouncedSearch, tagFilter, contacts])


  const handleAdd = useCallback(() => {
    setSelectedContact(null)
    setModalOpen(true)
  }, [])

  const handleEdit = useCallback(contact => {
    setSelectedContact(contact)
    setModalOpen(true)
  }, [])

  const handleSearchChange = useCallback((e) => {
    const val = e.target.value
    setSearchParams(prev => {
      if (val) prev.set('search', val)
      else prev.delete('search')
      return prev
    })
  }, [setSearchParams])

  const handleTagChange = useCallback((e) => {
    const val = e.target.value
    setSearchParams(prev => {
      if (val) prev.set('tag', val)
      else prev.delete('tag')
      return prev
    })
  }, [setSearchParams])

  return (
    <>
     <Toaster position="top-right" />

<div className="flex flex-col gap-4 mb-6">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
      {admin ? "All Users Contacts" : "Contacts"}
    </h1>

    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={handleSearchChange}
        className="w-full sm:w-56 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-[#111520] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition"
      />

    
        <select
          value={tagFilter}
          onChange={handleTagChange}
          className="w-full sm:w-36 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-[#111520] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition appearance-none"
        >
          <option value="">All Tags</option>
          <option value="Lead">Lead</option>
          <option value="Client">Client</option>
          <option value="VIP">VIP</option>
        </select>


      <button
        onClick={handleAdd}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
      >
        <span className="text-base leading-none">+</span>
        Add Contact
      </button>
    </div>
  </div>
</div>

  <ContactsTable
    contacts={filteredContacts}
    loading={loading}
    onEdit={handleEdit}
    admin={admin}
  />

  <ContactModal
    isOpen={modalOpen}
    onClose={() =>{
      setModalOpen(false)
      fetchContacts()
    }}
    contact={selectedContact}
    users={users}
    admin={admin}
    addContact={addContact}
    editContact={editContact}
  /> </>
  )
}