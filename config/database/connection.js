const mongoose = require("mongoose");

const { DB_USERNAME, DB_PASSWORD } = process.env;

const URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@localhost:27017/zoloproperty`;
// const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.z4sn1bj.mongodb.net/`;

console.log(URL);

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`Connected\nDB: ${DB_USERNAME}`);
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();
