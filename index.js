const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

dotenv.config({path: './config/config.env'});
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}
connectDB();


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/favourite', require('./routes/favourite'));

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));