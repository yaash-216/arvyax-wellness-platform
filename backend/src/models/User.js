import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("User", userSchema);
