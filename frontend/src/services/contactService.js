import api from "../utils/api"

export const getContacts = async (allUsers = false) => {
  try {
    const res = await api.get("/contacts", {
      params: { all: allUsers }
    })
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

export const createContact = async (data) => {
  try {
    const res = await api.post("/contacts", data)
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

export const updateContact = async (id, data) => {
  try {
    const res = await api.put(`/contacts/${id}`, data)
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

export const deleteContact = async (id) => {
  try {
    const res = await api.delete(`/contacts/${id}`)
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

export const getContactById = async (id) => {
  try {
    const res = await api.get(`/contacts/${id}`)
    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw error
  }

}
export const restoreContact = async (id) => {
 try {
   const res = await api.put(`/contacts/restore/${id}`)
  return res.data
 } catch (error) {
    console.error(error.response?.data || error.message)
    throw error
 }
}