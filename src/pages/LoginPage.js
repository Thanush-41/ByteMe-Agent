import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'student' && password === 'student') {
      onLogin('student');
    } else if (username === 'teacher' && password === 'teacher') {
      onLogin('teacher');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-page-bg">
      <div className="login-header">
        <img src="/logo.png" alt="Samvidha Logo" className="login-logo" />
        <h2>Faculty / Student Login</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <div className="forgot-password">I forgot my password</div>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
