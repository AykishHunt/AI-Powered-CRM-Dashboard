
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },

    phone: {
      type: String,
      trim: true
    },

    tags: {
      type: [String],
      enum: ["Client", "Lead", "VIP"],
      default: ["Client"]
    },
    company: {
       type: String, 
       trim: true 
    },
    notes: { 
      type: String, 
      trim: true 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Contact", contactSchema);