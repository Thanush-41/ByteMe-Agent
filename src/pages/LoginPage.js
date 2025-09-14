import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(username, password);
      
      if (!result.success) {
        setError(result.error || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
  }

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
          disabled={isLoading}
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="forgot-password">I forgot my password</div>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
