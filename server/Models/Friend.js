import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ] 
  },
  { timestamps: true }
);

friendSchema.index({ user: 1}, { unique: true });

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;
