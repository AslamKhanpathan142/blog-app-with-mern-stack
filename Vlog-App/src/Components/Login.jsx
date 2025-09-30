import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Invalid email or password');
      }

      const token = await res.json();
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', form.email);
      navigate('/profile')
      onLoginSuccess();
      
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="login-container8">
      <div className="login-background8">
        <div className="login-shapes8">
          <div className="shape shape8-1"></div>
          <div className="shape shape8-2"></div>
          <div className="shape shape8-3"></div>
        </div>
      </div>

      <div className="login-card8">
        {/* Header Section */}
        <div className="login-header8">
          <div className="login-icon8">
            <span className="icon8">🔐</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue your journey</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form8">
          {/* Email Input */}
          <div className="input-group8">
            <label htmlFor="email" className="input-label8">
              <span className="label-icon8">📧</span>
              Email Address
            </label>
            <div className="input-container8">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleInputChange}
                className={`form-input8 ${errors.email ? 'error' : ''}`}
                disabled={isLoading}
              />
              <div className="input-border8"></div>
            </div>
            {errors.email && <span className="error-message8">{errors.email}</span>}
          </div>

          {/* Password Input */}
          <div className="input-group8">
            <label htmlFor="password" className="input-label8">
              <span className="label-icon8">🔒</span>
              Password
            </label>
            <div className="input-container8">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleInputChange}
                className={`form-input8 ${errors.password ? 'error' : ''}`}
                disabled={isLoading}
              />
              <div className="input-border8"></div>
            </div>
            {errors.password && <span className="error-message8">{errors.password}</span>}
          </div>

          {/* Forgot Password */}
          <div className="forgot-password8">
            <a href="/forgot-password" className="forgot-link8">
              Forgot your password?
            </a>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`login-btn8 ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="btn-spinner8"></div>
                Signing In...
              </>
            ) : (
              <>
                <span className="btn-icon8">🚀</span>
                Sign In
              </>
            )}
          </button>

          {/* Error Message */}
          {errors.submit && (
            <div className="submit-error8">
              <span className="error-icon8">⚠️</span>
              {errors.submit}
            </div>
          )}

          {/* Divider */}
          <div className="divider8">
            <span>or continue with</span>
          </div>

          {/* Social Login */}
          <div className="social-login8">
            <button type="button" className="social-btn google-btn8">
              <span className="social-icon8">🔍</span>
              Google
            </button>
            <button type="button" className="social-btn8 github-btn8">
              <span className="social-icon8">💻</span>
              GitHub
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <div className="signup-section8">
          <p>Don't have an account? <a href="/signup" className="signup-link8">Create one here</a></p>
        </div>

        {/* Security Note */}
        <div className="security-note8">
          <div className="security-icon8">🛡️</div>
          <p>Your data is securely encrypted and protected</p>
        </div>
      </div>

      {/* Demo Credentials Hint */}
      <div className="demo-hint8">
        <details className="demo-details8">
          <summary>Demo Credentials</summary>
          <div className="demo-content8">
            <p><strong>Email:</strong> demo@example.com</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
        </details>
      </div>
    </div>
  );
}

export default Login;