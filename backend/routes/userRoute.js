import express from "express"
import User from "../models/User.js"
import { protect, adminOnly } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("name email role")
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" })
  }
})

export default router