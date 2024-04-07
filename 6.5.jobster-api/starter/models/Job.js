const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    // It's hard to understand.
    // In my understand, createdBy will take document id from user id and keep in itself.
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User", // model reference => stick the user with job.
      required: [true, "Please provide user"],
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
  },
  { timestamps: true }
); // The timestamp give a created and update date.

module.exports = mongoose.model("Job", JobSchema);
