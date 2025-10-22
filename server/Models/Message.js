import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        type: {
            type: String,
            enum: ['TXT', 'IMG', 'VID', 'VOI'],
            required: true
        },


        content: { // File Path txt msg ....
            type: String,
            required: true
        }



    },
    { timestamps: true }
);

messageSchema.index({ from: 1, to: 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
