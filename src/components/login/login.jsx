import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.scss';
import Alert from '../alert/alert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCookie } from '../../hooks/useCookie';
import authService from '../../services/AuthService';


export default function login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setIsAuthenticated } = useAuth();

  const { saveAuthCookie } = useCookie();

  const navigate = useNavigate();

 

  const { loginUser } = authService();



  const handleSuccess = (res) => {
    //set the jwt token in a cookie
    saveAuthCookie(res.data.jwt);

    //reset our state
    setIdentifier('');
    setPassword('');
    //set authenticated state to true
    setIsAuthenticated(true);
    //navigate to homepage
    navigate('/');
  };

  const handleError = (err) => {
    setAlert(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default submission process when submitting the page

     
    await loginUser({identifier, password}, handleSuccess, handleError);
  };
   


  return (
    <>
    <Alert data={alert} />
    <form className="form form--page" onSubmit={handleSubmit}> {/* Using onSubmit to handle form submission */}
      <div className="form__group form__group--page">
        <label className="form__label">Email</label>
        <input
          className="form__field"
          type="text"
          placeholder="Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
        or  <Link to="/forgot-password">Forgot Password</Link>
      </footer>
    </form>
    </>
  );
  }