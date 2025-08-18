import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { FiLock, FiMail, FiUser, FiCheck, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import './signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: 'transparent'
  });
  const navigate = useNavigate();

  // Password strength checker
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength({
        score: 0,
        message: '',
        color: 'transparent'
      });
      return;
    }

    const calculateStrength = () => {
      let score = 0;
      const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        specialChar: /[^A-Za-z0-9]/.test(password)
      };

      // Calculate score
      score += requirements.length ? 1 : 0;
      score += requirements.uppercase ? 1 : 0;
      score += requirements.lowercase ? 1 : 0;
      score += requirements.number ? 1 : 0;
      score += requirements.specialChar ? 1 : 0;

      // Determine message and color
      let message = '';
      let color = '';
      if (score <= 1) {
        message = 'Very Weak';
        color = '#ef4444'; // red
      } else if (score <= 2) {
        message = 'Weak';
        color = '#f97316'; // orange
      } else if (score <= 3) {
        message = 'Moderate';
        color = '#eab308'; // yellow
      } else if (score <= 4) {
        message = 'Strong';
        color = '#84cc16'; // lime
      } else {
        message = 'Very Strong';
        color = '#10b981'; // emerald
      }

      setPasswordStrength({
        score,
        message,
        color,
        requirements
      });
    };

    calculateStrength();
  }, [password]);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google Auth Success:', decoded);
      
      // Here you would typically send the token to your backend
      localStorage.setItem('user', JSON.stringify({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture
      }));
      
      navigate('/');
    } catch (err) {
      setError('Google authentication failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setError('Google authentication failed. Please try again.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Here you would typically call your signup API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just store in localStorage
      localStorage.setItem('user', JSON.stringify({
        name,
        email,
        // Never store passwords in localStorage in production!
        // This is just for demo purposes
        password: password 
      }));
      
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>
        {error && <p className="auth-error">{error}</p>}

        <div className="google-auth-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
            text="signup_with"
            shape="rectangular"
            size="large"
          />
        </div>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <FiUser /> Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">
              <FiMail /> Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              <FiLock /> Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            
            {/* Password Strength Meter */}
            <div className="password-strength">
              <div 
                className="password-strength-bar"
                style={{
                  width: `${(passwordStrength.score / 5) * 100}%`,
                  backgroundColor: passwordStrength.color
                }}
              ></div>
              {password.length > 0 && (
                <span className="password-strength-text">
                  Strength: {passwordStrength.message}
                </span>
              )}
            </div>
            
            {/* Password Requirements */}
            <div className="password-requirements">
              <p>Password must contain:</p>
              <ul>
                <li className={password.length >= 8 ? 'valid' : 'invalid'}>
                  {password.length >= 8 ? <FiCheck /> : <FiX />}
                  At least 8 characters
                </li>
                <li className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}>
                  {/[A-Z]/.test(password) ? <FiCheck /> : <FiX />}
                  At least one uppercase letter
                </li>
                <li className={/[a-z]/.test(password) ? 'valid' : 'invalid'}>
                  {/[a-z]/.test(password) ? <FiCheck /> : <FiX />}
                  At least one lowercase letter
                </li>
                <li className={/[0-9]/.test(password) ? 'valid' : 'invalid'}>
                  {/[0-9]/.test(password) ? <FiCheck /> : <FiX />}
                  At least one number
                </li>
                <li className={/[^A-Za-z0-9]/.test(password) ? 'valid' : 'invalid'}>
                  {/[^A-Za-z0-9]/.test(password) ? <FiCheck /> : <FiX />}
                  At least one special character
                </li>
              </ul>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || passwordStrength.score < 3} 
            className="auth-btn"
            title={passwordStrength.score < 3 ? "Password must be at least 'Moderate' strength" : ""}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;