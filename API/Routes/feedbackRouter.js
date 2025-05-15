import express from 'express';
import * as FeedbackController from '../controller/feedbackController.js';

const router = express.Router();

// Route to submit feedback
router.post('/', FeedbackController.submitFeedback);

// Route to get all feedback (optional, for admin or analytics)
router.get('/', FeedbackController.getAllFeedback);

// Route to get feedback for a specific faculty
router.get('/faculty/:facultyId', FeedbackController.getFacultyFeedback);

export default router;