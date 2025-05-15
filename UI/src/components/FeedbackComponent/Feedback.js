import './Feedback.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { _userapiurl } from '../../ApiUrl.js';

function Feedback() {
  const [formData, setFormData] = useState({
    facultyId: '',
    message: '',
    rating: '',
  });
  const [facultyList, setFacultyList] = useState([]);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch faculty list on component mount
  useEffect(() => {
    axios
      .get(_userapiurl + 'faculty')
      .then((response) => {
        setFacultyList(response.data.faculty || []);
      })
      .catch((error) => {
        setOutput('Failed to load faculty list. Please try again.');
        console.error('Error fetching faculty:', error);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.facultyId) {
      setOutput('Please select a faculty member.');
      return;
    }
    if (!formData.message.trim()) {
      setOutput('Feedback message is required.');
      return;
    }
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      setOutput('Please select a rating between 1 and 5.');
      return;
    }

    setLoading(true);
    setOutput('');

    // Prepare feedback data
    const feedbackData = {
      userId: localStorage.getItem('_id'),
      userName: localStorage.getItem('name'),
      facultyId: formData.facultyId,
      message: formData.message,
      rating: parseInt(formData.rating),
      createdAt: new Date().toISOString(),
    };

    // Submit feedback to API
    axios
      .post('http://localhost:3001/feedback', feedbackData)
      .then((response) => {
        setOutput('Feedback submitted successfully!');
        setFormData({ facultyId: '', message: '', rating: '' });
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.message || 'Failed to submit feedback. Please try again.';
        setOutput(errorMsg);
        console.error('Error submitting feedback:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div id='box1'>
      <h2>Submit Feedback</h2>
      {output && <p className={`output-message ${output.includes('Failed') ? 'error' : ''}`}>{output}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="facultyId">Select Faculty:</label>
          <select
            className="form-control"
            name="facultyId"
            value={formData.facultyId}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Select Faculty</option>
            {facultyList.map((faculty) => (
              <option key={faculty._id} value={faculty._id}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="message">Feedback Message:</label>
          <textarea
            className="form-control"
            name="message"
            placeholder="Enter your feedback"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            disabled={loading}
          ></textarea>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="rating">Rating (1-5):</label>
          <select
            className="form-control"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-danger"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

export default Feedback;

