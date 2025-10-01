
import React, { useState } from 'react';
import '../styles/Signup.css';

function Signup({ onSignupSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (form.password && form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      alert(data.message || 'Signup successful!');
      onSignupSuccess();
      
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

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="signup-container9">
      <div className="signup-background9">
        <div className="signup-shapes9">
          <div className="shape shape9-1"></div>
          <div className="shape shape9-2"></div>
          <div className="shape shape9-3"></div>
        </div>
      </div>

      <div className="signup-card9">
        {/* Header Section */}
        <div className="signup-header9">
          <div className="signup-icon9">
            <span className="icon9">👋</span>
          </div>
          <h1>Join Our Community</h1>
          <p>Create your account and start sharing your stories</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="signup-form9">
          {/* Name Input */}
          <div className="input-group9">
            <label htmlFor="name" className="input-label9">
              <span className="label-icon9">👤</span>
              Full Name
            </label>
            <div className="input-container9">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleInputChange}
                className={`form-input9 ${errors.name ? 'error' : ''}`}
                disabled={isLoading}
              />
              <div className="input-border9"></div>
            </div>
            {errors.name && <span className="error-message9">{errors.name}</span>}
          </div>

          {/* Email Input */}
          <div className="input-group9">
            <label htmlFor="email" className="input-label9">
              <span className="label-icon9">📧</span>
              Email Address
            </label>
            <div className="input-container9">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleInputChange}
                className={`form-input9 ${errors.email ? 'error' : ''}`}
                disabled={isLoading}
              />
              <div className="input-border9"></div>
            </div>
            {errors.email && <span className="error-message9">{errors.email}</span>}
          </div>

          {/* Password Input */}
          <div className="input-group9">
            <label htmlFor="password" className="input-label9">
              <span className="label-icon9">🔒</span>
              Password
            </label>
            <div className="input-container9 password-container9">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleInputChange}
                className={`form-input9 ${errors.password ? 'error' : ''}`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle9"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              <div className="input-border9"></div>
            </div>
            {errors.password && <span className="error-message9">{errors.password}</span>}
            <div className="password-hint9">
              Must be at least 6 characters long
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="terms-agreement9">
            <label className="checkbox-label9">
              <input type="checkbox" required />
              <span className="checkmark9"></span>
              I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`signup-btn9 ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="btn-spinner9"></div>
                Creating Account...
              </>
            ) : (
              <>
                <span className="btn-icon9">🚀</span>
                Create Account
              </>
            )}
          </button>

          {/* Error Message */}
          {errors.submit && (
            <div className="submit-error9">
              <span className="error-icon9">⚠️</span>
              {errors.submit}
            </div>
          )}

          {/* Divider */}
          <div className="divider9">
            <span>or sign up with</span>
          </div>

          {/* Social Signup */}
          <div className="social-signup9">
            <button type="button" className="social-btn9 google-btn9">
              <span className="social-icon9">🔍</span>
              Google
            </button>
            <button type="button" className="social-btn9 github-btn9">
              <span className="social-icon9">💻</span>
              GitHub
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="login-section9">
          <p>Already have an account? <a href="/login" className="login-link9">Sign in here</a></p>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section9">
          <h4>🎁 Join us and get:</h4>
          <div className="benefits-list9">
            <div className="benefit9">
              <span className="benefit-icon9">✍️</span>
              <span>Create unlimited blogs</span>
            </div>
            <div className="benefit9">
              <span className="benefit-icon9">❤️</span>
              <span>Save your favorite posts</span>
            </div>
            <div className="benefit9">
              <span className="benefit-icon9">👥</span>
              <span>Join our writing community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;