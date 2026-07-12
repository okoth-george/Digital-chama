import { useState } from 'react';
import { signUpUser } from '../services/Auth';
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    setError(null);
    setMessage('');
    setIsSubmitting(true);

    try {
      const result = await signUpUser({ email, password, fullName, phoneNumber });
      if (result.needsConfirmation) {
        setMessage(`Account created for ${email}. Check your email to confirm before logging in.`);
      } else {
        setMessage(`Account created for ${result.profile?.full_name || email}.`);
      }
    } catch (err) {
      setError(err.message || 'Signup failed.');
    } finally {
      setIsSubmitting(false);
    }
   
  }

  return (
    <div style={{ maxWidth: 420, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} style={{ display: 'grid', gap: '0.75rem' }}>
        <input
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
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
          {isSubmitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
      
      <Link to="/login">Already have an account? Log in here.</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}
  