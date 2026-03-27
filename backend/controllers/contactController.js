
import Contact from "../models/Contact.js"

export const getContacts = async (req, res) => {
  try {
    const filter =
      req.user.role === "admin"
        ? {}
        : { userId: req.user._id }

    const contacts = await Contact.find(filter).populate("userId","name email").sort({ createdAt: -1 })

    res.status(200).json(contacts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      userId: req.user._id
    })
    res.status(201).json(contact)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" })
    }

    const isOwner =
      contact.userId.toString() === req.user._id.toString()

    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({ message: "Forbidden" })
    }

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" })
    }

    const isOwner =
      contact.userId.toString() === req.user._id.toString()

    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({ message: "Forbidden" })
    }

    await contact.deleteOne()

    res.status(200).json({ message: "Contact deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" })
    }

    const isOwner =
      contact.userId.toString() === req.user._id.toString()

    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({ message: "Forbidden" })
    }

    res.status(200).json(contact)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}