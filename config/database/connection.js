const mongoose = require('mongoose');

const { DB_NAME, DB_HOST, DB_PORT, PORT, DB_USERNAME, DB_PASSWORD } =
  process.env;

const URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
// const URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected\nDB: ${DB_NAME}\nPORT: ${PORT}`);
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();
