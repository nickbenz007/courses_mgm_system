import mongoose, { mongo } from "mongoose";

const connectToDataBase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`.bold.yellow);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectToDataBase;
