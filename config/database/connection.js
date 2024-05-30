const mongoose = require("mongoose");

const { DB_USERNAME, DB_PASSWORD } = process.env;

const URL = process.env.DB_STR;

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected\nDB: ${DB_USERNAME}`);
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();
