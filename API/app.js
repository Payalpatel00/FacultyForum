import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
const app = express();

// to link router files on app.js
import userRouter from './Routes/userRouter.js';
import feedbackRouter from './Routes/feedbackRouter.js';

// to load to cors function resolve cors problem
app.use(cors());

// to read a binary resource
app.use(fileUpload());

// to load config of body parser
app.use(express.json()); // Replaces body-parser
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/facultyforum', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// application level middleware check base url
app.use("/user", userRouter);
app.use("/feedback", feedbackRouter);

app.listen(3001, () => {
  console.log("Server listening at link: http://localhost:3001");
});