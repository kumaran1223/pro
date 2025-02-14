import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register_new.css';

const Register = () => {
  const [isOtpVerified, setIsOtpVerified] = useState(false); // New state for OTP verification
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeRelationship, setNomineeRelationship] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [membershipId, setMembershipId] = useState(''); // New membership ID state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name) {
      alert('Please provide your name');
      return false;
    }
    if (!email) {
      alert('Please provide an email');
      return false;
    }
    if (!password) {
      alert('Please provide a password');
      return false;
    }
    if (!confirmPassword) {
      alert('Please confirm your password');
      return false;
    }
    if (!phoneNumber) {
      alert('Please provide a phone number');
      return false;
    }
    if (!nomineeName) {
      alert('Please provide a nominee name');
      return false;
    }
    if (!otp) {
      alert('Please enter the OTP');
      return false;
    }
    if (!nomineeRelationship) {
      alert('Please provide a nominee relationship');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;

    // Generate a unique membership ID (for example, use current timestamp)
    const generatedMembershipId = 'M-' + Date.now(); // Simple unique ID
    setMembershipId(generatedMembershipId); // Set membership ID

    // Save registration details to localStorage
    localStorage.setItem('membershipId', generatedMembershipId);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    console.log('Registering with', { name, email, password, phoneNumber, nomineeName, nomineeRelationship });
    alert('Registration successful! Your Membership ID is: ' + generatedMembershipId);
    navigate('/login'); // Redirect to login after successful registration
  };

  const generateOtp = () => {
    if (!phoneNumber) {
      alert('Please provide a phone number before generating OTP');
      return;
    }
    if (!otp) {
      alert('Please enter the OTP');
      return false;
    }
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    setGeneratedOtp(otp);
    alert(`Your OTP is: ${otp}`);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp.toString()) {
      alert('OTP verified successfully!');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-with-button">
          <div>
            <label>Phone Number</label>
            <input 
              type="text" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              required 
            />
          </div>
          <button type="button" onClick={generateOtp} className="side-button">Send OTP</button>
        </div>
        <div className="input-with-button">
          <div>
            <label>Enter OTP</label>
            <input 
              type="text" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              required 
            />
          </div>
          <button type="button" onClick={verifyOtp} className="side-button">Verify OTP</button>
          <button type="button" onClick={generateOtp} className="side-button">Resend OTP</button>
        </div>
        <div>
          <label>Nominee Name</label>
          <input type="text" value={nomineeName} onChange={(e) => setNomineeName(e.target.value)} required />
        </div>
        <div>
          <label>Nominee Relationship</label>
          <input type="text" value={nomineeRelationship} onChange={(e) => setNomineeRelationship(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
