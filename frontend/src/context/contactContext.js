import { createContext, useState, useEffect } from 'react'
import { getContacts, createContact, updateContact, deleteContact } from '../services/contactService'

export const ContactContext = createContext()

export const ContactProvider = ({ children, admin = false }) => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const data = await getContacts(admin)
      setContacts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [admin])

  const addContact = async (contact) => {
    const saved = await createContact(contact)
    setContacts(prev => [...prev, saved])
    return saved
  }

  const editContact = async (id, updated) => {
    const saved = await updateContact(id, updated)
    setContacts(prev => prev.map(c => c._id === id ? saved : c))
    return saved
  }

  const removeContact = async (id) => {
    await deleteContact(id)
    setContacts(prev => prev.filter(c => c._id !== id))
  }

  const resetContacts = () => {
  setContacts([])
``}

  return (
    <ContactContext.Provider value={{
      contacts,
      loading,
      fetchContacts,
      addContact,
      editContact,
      removeContact,
      resetContacts
    }}>
      {children}
    </ContactContext.Provider>
  )
}