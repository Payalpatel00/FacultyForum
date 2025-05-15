import './FacultyFeedback.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { _userapiurl } from '../../ApiUrl.js';

function FacultyFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch feedback for the logged-in faculty
  useEffect(() => {
    const facultyId = localStorage.getItem('_id');
    if (!facultyId) {
      setOutput('Faculty ID not found. Please log in again.');
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:3001/feedback/faculty/${facultyId}`)
      .then((response) => {
        console.log('API Response:', response.data); // Debug log
        if (response.data.feedback) {
          setFeedbackList(response.data.feedback);
          if (response.data.feedback.length === 0) {
            setOutput('No feedback available.');
          }
        } else if (response.data.message) {
          setOutput(response.data.message);
        } else {
          setOutput('Unexpected response format.');
        }
      })
      .catch((error) => {
        console.error('API Error:', error); // Debug log
        const errorMsg = error.response?.data?.message || 'Failed to load feedback. Please try again.';
        setOutput(errorMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div id="box1">
      <h2>Faculty Feedback</h2>
      {output && <p className={`output-message ${output.includes('Failed') || output.includes('Invalid') ? 'error' : ''}`}>{output}</p>}
      {loading ? (
        <p>Loading feedback...</p>
      ) : (
        <div className="feedback-list">
          {feedbackList.length > 0 ? (
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Feedback Message</th>
                  <th>Rating</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((feedback) => (
                  <tr key={feedback._id}>
                    <td>{feedback.userName}</td>
                    <td>{feedback.message}</td>
                    <td>{feedback.rating}/5</td>
                    <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No feedback to display.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FacultyFeedback;