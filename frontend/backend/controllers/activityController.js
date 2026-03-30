import Activity from "../models/Activity.js"

export const getActivities = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { userId: req.user._id }
    const activities = await Activity.find(filter)
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .limit(20)
    res.status(200).json(activities)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}