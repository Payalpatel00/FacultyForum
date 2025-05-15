import './Register.css';
import { useState } from 'react';
import axios from 'axios';
import { _userapiurl } from '../../ApiUrl';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roll: '',
    password: '',
    mobile: '',
    address: '',
    gender: '',
  });
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Required fields
    if (!formData.name.trim()) {
      setOutput('Name is required.');
      return false;
    }
    if (!formData.email.trim()) {
      setOutput('Email is required.');
      return false;
    }
    if (!formData.roll.trim()) {
      setOutput('Roll number is required.');
      return false;
    }
    if (!formData.password.trim()) {
      setOutput('Password is required.');
      return false;
    }
    if (!formData.mobile.trim()) {
      setOutput('Mobile number is required.');
      return false;
    }
    if (!formData.address.trim()) {
      setOutput('Address is required.');
      return false;
    }
    if (!formData.gender) {
      setOutput('Please select a gender.');
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setOutput('Please enter a valid email address.');
      return false;
    }

    // Mobile number validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setOutput('Mobile number must be a 10-digit number.');
      return false;
    }

    // Password length validation
    if (formData.password.length < 6) {
      setOutput('Password must be at least 6 characters long.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setOutput('');

    const userDetail = {
      name: formData.name,
      email: formData.email,
      roll: formData.roll,
      password: formData.password,
      mobile: formData.mobile,
      address: formData.address,
      gender: formData.gender,
    };

    axios
      .post(_userapiurl + 'save', userDetail)
      .then((response) => {
        setOutput('User registered successfully.');
        setFormData({
          name: '',
          email: '',
          roll: '',
          password: '',
          mobile: '',
          address: '',
          gender: '',
        });
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.message || 'User registration failed.';
        setOutput(errorMsg);
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div id="box1">
      <h2>Register Here!!</h2>
      {output && (
        <font
          id="font"
          className={output.includes('successfully') ? 'success' : 'error'}
        >
          {output}
        </font>
      )}
      <form id="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="roll">Roll No:</label>
          <input
            type="text"
            className="form-control"
            name="roll"
            placeholder="Enter Roll Number"
            value={formData.roll}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            placeholder="Enter mobile"
            value={formData.mobile}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            className="form-control"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            disabled={loading}
          ></textarea>
        </div>
        <div className="form-group" id="radio">
          <label>Gender:</label>
          <label style={{ marginLeft: '10px' }}>
            Male:
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              disabled={loading}
            />
          </label>
          <label style={{ marginLeft: '10px' }}>
            Female:
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              disabled={loading}
            />
          </label>
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-danger"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;