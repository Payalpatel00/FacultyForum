import FeedbackSchemaModel from '../Model/feedbackModel.js';
import UserSchemaModel from '../Model/userModel.js';

// Submit feedback
export const submitFeedback = async (req, res) => {
  try {
    const { userId, userName, facultyId, message, rating, createdAt } = req.body;

    // Validate required fields
    if (!userId || !userName || !facultyId || !message || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Validate facultyId (must be a user with role: 'faculty')
    const faculty = await UserSchemaModel.findOne({ _id: facultyId, role: 'faculty' });
    if (!faculty) {
      return res.status(400).json({ message: 'Invalid faculty ID' });
    }

    // Generate unique _id for feedback
    const feedbackList = await FeedbackSchemaModel.find();
    const l = feedbackList.length;
    const _id = l === 0 ? 1 : feedbackList[l - 1]._id + 1;

    // Create new feedback
    const feedback = await FeedbackSchemaModel.create({
      _id,
      userId,
      userName,
      facultyId,
      message,
      rating,
      createdAt: createdAt || Date.now(),
    });

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all feedback (optional, for admin or analytics)
export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackSchemaModel.find()
      .populate('userId', 'name')
      .populate('facultyId', 'name');
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get feedback for a specific faculty
export const getFacultyFeedback = async (req, res) => {
  try {
    const facultyId = parseInt(req.params.facultyId);
    if (!facultyId) {
      return res.status(400).json({ message: 'Faculty ID is required' });
    }

    // Verify faculty exists
    const faculty = await UserSchemaModel.findOne({ _id: facultyId, role: 'faculty' });
    if (!faculty) {
      return res.status(400).json({ message: 'Invalid faculty ID' });
    }

    const feedback = await FeedbackSchemaModel.find({ facultyId }).sort({ createdAt: -1 });
    res.status(200).json({ feedback });
  } catch (error) {
    console.error('Error fetching faculty feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};