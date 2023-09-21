import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.scss';

import Alert from '../alert/alert';

import { useApi } from '../../hooks/useApi';


export default function forgot_password() {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const { post } = useApi();

  const handleSuccess = () => {
    //reset our state
    setEmail('');
    // set success alert
    setAlert({
      type: 'success',
      message: 'Please check your email for further instructions.',
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default submission process when submitting the page


    // Checking if the function is being called correctly
    console.log('handleLogin called');

    await post('auth/forgot-password', {
      data: { email },
      onSuccess: (res) => handleSuccess(),
      onFailure: (err) => setAlert(err)
    });
    // try {
    //   const response = await axios.post(
    //     'http://localhost:1337/api/auth/forgot-password', 
    //     data
    //   );
      
    //   //reset our state
    //   setEmail('');
    

    // //set success alert
    // setAlert({
    //   type:'success',
    //   message: 'Please check your email for further instructions',
    // })
    // } catch (err) {
    //   setAlert(parseErrors(err));
    // }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        Have an account already? <Link to="/login">Login</Link>
      </footer>
    </form>
    </>
  );
}
