import mongoose from "mongoose";

const infractionSchema = new mongoose.Schema(
  {
    server: {
      type: String,
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
    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export interface IInfractionModel extends mongoose.Document {
  server: string;
  user: string;
  type: "MUTE" | "WARN";
  reason: string;
}

const Infraction = mongoose.model("Infraction", infractionSchema);
export { Infraction };
