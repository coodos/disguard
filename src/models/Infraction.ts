import mongoose from "mongoose";

const infractionSchema = new mongoose.Schema(
  {
    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["MUTE", "WARN"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface IInfractionModel extends mongoose.Document {
  server: mongoose.Schema.Types.ObjectId;
  user: string;
  type: "MUTE" | "WARN";
}

const Infraction = mongoose.model("Infraction", infractionSchema);
export { Infraction };