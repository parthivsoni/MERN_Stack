const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//routes
const userRoutes = require("./routes/userRoute");
const blogRoutes = require("./routes/blogRoutes");

//mongoDB connection
connectDB();

//rest objects
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

const PORT = process.env.PORT || 8000;

//listen
app.listen(8000, () => {
  console.log(
    `server is running on ${process.env.DEV_MODE} mode on port ${PORT}`
  );
});
