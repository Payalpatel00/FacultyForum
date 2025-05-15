import mongoose from "mongoose";

const url ="mongodb://localhost:27017/minor";

mongoose.connect(url);

console.log("Succesfully connected to  database");