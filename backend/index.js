const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const dbConfig= require("./config/database.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// connecting database

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=>{
    console.log("Database connected successfully");
}).catch(err=>{
    console.log("could not connected to database. Exiting now => " + err);
})

// create express app

const app = express();
const PORT = 3000;
// parse request of content type- application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

// parse req of content-type - application/json
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.json({ "message" : "Welcome"});
})

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
})
