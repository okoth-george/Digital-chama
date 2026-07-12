import { useState } from 'react';
import { loginUser } from '../services/Auth';
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setMessage('');
    setIsSubmitting(true);

    try {
      await loginUser({ email, password });
      setMessage('Logged in successfully.');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'grid', gap: '0.75rem' }}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
        <Link to="/signup">Don't have an account? Sign up here.</Link>
     
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}
