import { React, useState} from 'react';
import '../styles/form.scss';
import { Link } from 'react-router-dom';

export default function register() {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const [error, setError] = useState({});

//send data to backend
const registerUser = async (person) => {
  //validation confirm password
  if (person.password !== person.confirmPassword) {
    setError({ message: 'Passwords do not match'});
    return;
}

const { response, error } = await createUser(person);
if (response) {
  //clear form fields
  setFirstName('');
  setLastName('');
  setEmail('');
   setPassword('');
  setConfirmPassword('');
  setError({});
}
if (error) {
  setError(error);
}
};
const handleSubmit = (e) => {
  e.preventDefault();
  const user = {
    firstName,
    lastName,
    username: email,
    email,
    password,
    confirmPassword,
  };

  registerUser(user);
};

console.log(user);
  return (
    <div class="form form--page">
      <div class="form__group form__group--page">
        <label class="form__label">First name</label>
        <input class="form__field" 
        type="text" 
        placeholder="First name" />
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      </div>

      <div class="form__group form__group--page">
        <label class="form__label">Last name</label>
        <input class="form__field"
         type="text" 
         placeholder="Last name" />
         value={lastName}
         onChange={(e) => setLastName(e.target.value)}
      </div>

      <div class="form__group form__group--page">
        <label class="form__label">Email</label>
        <input class="form__field" type="text" 
        placeholder="Email" />
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      </div>

      <div class="form__group form__group--page">
        <label class="form__label">Choose password</label>
        <input class="form__field" type="text" 
        placeholder="Choose password" />
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      </div>

      <div class="form__group form__group--page">
        <label class="form__label">Confirm Password</label>
        <input class="form__field" type="text" placeholder="Confirm Password" />
      </div>

      <div class="form__group form__group--page">
        <input class="form__btn" type="submit" value="Register" />
      </div>

      <footer>
        Already have an account? <Link to='/login'>Login</Link>
      </footer>
    </div>
  );
}
