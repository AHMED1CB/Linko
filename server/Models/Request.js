import mongoose from "mongoose";

const requesSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },

    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
  },
  { timestamps: true }
);

requesSchema.index({ from: 1, to: 1 }, { unique: true });

const Request = mongoose.model("Request", requesSchema);

export default Request;
