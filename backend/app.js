const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dbConfig= require("./config/database.config");
const dotenv = require("dotenv");
const helmet = require("helmet");

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoute = require("./routes/user");


// mongoose.connect("mongodb+srv://Ankit1998:<password>@cluster0.llkpgl0.mongodb.net/?retryWrites=true&w=majority", {
mongoose.connect("mongodb://localhost:27017/facebook", {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log("Database connected successfully");
}).catch(err=>{
    console.log("could not connected to database. Exiting now => " + err);
})

mongoose.Promise = global.Promise;

dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(helmet());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

// Routes which should handle requests
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoute);



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
