import React, { useState } from 'react';
import './Login.css'; // Import CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginBox = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if username and password match the criteria
    if (username === 'SALONI' && password === '9555@SALONI') {
      // Redirect to the next page using window.open and pass the activated string
      window.open('/Aria?activated=true', '_self');
    } else {
      // Show alert for wrong username or password
      alert('Wrong username or password');
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label>Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginBox;
