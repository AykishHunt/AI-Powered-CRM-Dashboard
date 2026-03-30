import mongoose from "mongoose"

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["created", "updated", "deleted"],
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    contactName: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model("Activity", activitySchema)