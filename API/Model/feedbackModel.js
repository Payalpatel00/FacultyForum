import mongoose from 'mongoose';

const FeedbackSchema = mongoose.Schema({
  _id: Number,
  userId: {
    type: Number,
    ref: 'user_collections',
    required: [true, 'User ID is required'],
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
  },
  facultyId: {
    type: Number,
    ref: 'user_collections',
    required: [true, 'Faculty ID is required'],
  },
  message: {
    type: String,
    required: [true, 'Feedback message is required'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FeedbackSchemaModel = mongoose.model('feedback_collections', FeedbackSchema);

export default FeedbackSchemaModel;