import Activity from "../models/Activity.js"

const logActivity = async (action, userId, contactName) => {
  try {
    await Activity.create({ action, userId, contactName })
  } catch (err) {
    console.error("Activity log failed:", err.message)
  }
}

export default logActivity