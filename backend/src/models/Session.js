import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    tags: { type: [String], default: [] },
    json_file_url: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Session", sessionSchema);
