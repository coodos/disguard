import mongoose from "mongoose";

const serverSchema = new mongoose.Schema(
  {
    serverId: {
      type: String,
      required: true,
      unique: true,
    },
    superuserRole: {
      type: String,
      required: true,
    },
    mutedRole: {
      type: String,
      required: true,
    },
    sudoersRole: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface IServerModel extends mongoose.Document {
  serverId: string;
  sudoersRole: string;
  mutedRole: string;
  superuserRole: string;
}

const Server = mongoose.model<IServerModel>("Server", serverSchema);
export { Server };
