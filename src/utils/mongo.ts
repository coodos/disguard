import mongoose from "mongoose";

/*
 * Initiate a connection to the MongoDB connection string that is
 * provided in the params
 *
 * @param {String} connString - mongo db connection string
 * @returns {Promise<void>}
 */

const connectToDB = async (connString: string): Promise<void> => {
  try {
    const conn = await mongoose.connect(connString);
    console.log(`--> Connected to MongoDB on ${conn.connection.host}`);
  } catch (err) {
    console.log(`Can't connect to Mongo DB\nError: ${err}`);
    process.exit(1);
  }
};

export { connectToDB };
