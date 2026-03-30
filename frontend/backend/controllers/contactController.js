import mongoose from "mongoose"
import Contact from "../models/Contact.js"
import logActivity from "../utils/activityHelper.js"

export const getContacts = async (req, res) => {
  try {
    const filter = { deleted: false, ...(req.user.role === "admin" ? {} : { userId: req.user._id }) }
    const contacts = await Contact.find(filter).populate("userId", "name email").sort({ createdAt: -1 })
    res.status(200).json(contacts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createContact = async (req, res) => {
  try {
    const userId = (req.user.role === "admin" && req.body.userId) ? req.body.userId : req.user._id
    const contact = await Contact.create({ ...req.body, userId })
    const populated = await contact.populate("userId", "name email")
    await logActivity("created", req.user._id, contact.name)
    res.status(201).json(populated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ message: "Contact not found" })
    const isOwner = contact.userId.toString() === req.user._id.toString()
    if (req.user.role !== "admin" && !isOwner) return res.status(403).json({ message: "Forbidden" })
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("userId", "name email")
    await logActivity("updated", req.user._id, contact.name)
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ message: "Contact not found" })
    const isOwner = contact.userId.toString() === req.user._id.toString()
    if (req.user.role !== "admin" && !isOwner) return res.status(403).json({ message: "Forbidden" })
    contact.deleted = true
    await contact.save()
    await logActivity("deleted", req.user._id, contact.name)
    res.status(200).json({ message: "Contact deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const restoreContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ message: "Contact not found" })
    contact.deleted = false
    await contact.save()
    res.status(200).json(contact)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ message: "Contact not found" })
    const isOwner = contact.userId.toString() === req.user._id.toString()
    if (req.user.role !== "admin" && !isOwner) return res.status(403).json({ message: "Forbidden" })
    res.status(200).json(contact)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getStats = async (req, res) => {
  try {
    const filter = {
      deleted: false,
      ...(req.user.role === "admin" ? {} : { userId: new mongoose.Types.ObjectId(req.user._id) })
    }
    const total = await Contact.countDocuments(filter)
    const tagGroups = await Contact.aggregate([
      { $match: filter },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } }
    ])
    const byTag = tagGroups.reduce((acc, t) => {
      acc[t._id] = t.count
      return acc
    }, {})
    const lastEdited = await Contact.findOne(filter)
      .sort({ updatedAt: -1 })
      .populate("userId", "name email")
      .select("name email company tags updatedAt userId")
    res.status(200).json({ total, byTag, lastEdited })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}