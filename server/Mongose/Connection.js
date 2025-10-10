import mongoose from "mongoose";

async function connect() {

  const urls = {
    'PROD': process.env.MDB_URL,
    'LOCL': 'mongodb://127.0.0.1:27017/linko'
  }

  try {
    await mongoose.connect(urls[process.env.APP ?? 'PROD']);
    console.log("Connected Success");
  } catch (error) {
    console.error("Fail" + error);
  }
}

export default connect;
