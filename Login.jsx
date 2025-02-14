import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!uniqueId) {
      alert('Please enter your Membership ID');
      return;
    }
    if (!password) {
      alert('Please enter your password');
      return;
    }

    setLoading(true);
    setError('');

    // Check credentials against localStorage
    const storedId = localStorage.getItem('membershipId');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    // Check if credentials match
    if ((uniqueId === storedId || uniqueId === storedEmail) && password === storedPassword) {
      // Generate, store and send OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('otp', generatedOtp);
      alert(`Your OTP is: ${generatedOtp}`); // In real app, send via SMS/email
      setOtpSent(true);
    } else {
      setError('Invalid Membership ID/Email or password');
    }
    
    setLoading(false);
  };


  const verifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Get the OTP that was generated during login
    const generatedOtp = localStorage.getItem('otp');

    if (otp === generatedOtp) {
      alert('Login successful!');
      navigate('/'); // Redirect to home/dashboard after login
    } else {
      setError('Invalid OTP');
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={otpSent ? verifyOtp : handleLogin}>
        <div>
          <label>Unique ID</label>
          <input type="text" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {otpSent && (
          <div>
            <label>Enter OTP</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : (otpSent ? 'Verify OTP' : 'Login')}
        </button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;