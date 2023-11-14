import mongoose from "mongoose";

const ChatSchema = mongoose.Schema(
  {
    senderId: { type: String },
    members: {
      type: Array
    },
  },
  {
    timestamps: true,
  }
);
const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
