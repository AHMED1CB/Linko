import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.MDB_URL);
    console.log("Connected Success");
  } catch (error) {
    console.error("Fail" + error);
  }
}

export default connect;
