import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.scss';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default submission process when submitting the page

    // Checking if the function is being called correctly
    console.log('handleLogin called');

    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
      });

      console.log('Login successful!');
      // Login success callback

    } catch (error) {
      // Handle error
      console.error('An error occurred', error);

      // Using optional chaining to access error.response
      const statusCode = error.response?.status;
      const responseData = error.response?.data;

      // Checking if there's a response in the error
      if (statusCode && responseData) {
        // Log the status code and response data
        console.log('Status code:', statusCode);
        console.log('Response data:', responseData);
      } else {
        // Handle errors that don't have a response property
        console.log('Error message:', error.message);
      }
    }
  }

  return (
    <form className="form form--page" onSubmit={handleLogin}> {/* Using onSubmit to handle form submission */}
      <div className="form__group form__group--page">
        <label className="form__label">Email</label>
        <input
          className="form__field"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form__group form__group--page">
        <label className="form__label">Password</label>
        <input
          className="form__field"
          type="password" // Change value to password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form__group form__group--page">
        <button
          className="form__btn" // Change input type to button
          type="submit" // Specify the button type as "submit" to trigger submission
        >
          Login
        </button>
      </div>

      <footer>
        Don't have an account? <Link to="/register">Register</Link>
      </footer>
    </form>
  );
}
