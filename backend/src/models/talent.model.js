import mongoose from "mongoose";

const talentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: 0,
    },
  },
  { timestamps: true }
);

const Talent = mongoose.model("Talent", talentSchema);

export default Talent