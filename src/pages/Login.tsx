import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/api';
import { supabase } from '../utils/supabase';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        localStorage.setItem('access_token', data.access_token);
        await supabase.auth.setSession({ access_token: data.access_token, refresh_token: data.refresh_token });
        navigate('/dashboard');
      } else {
        setMessage(data.detail || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Network error or server is down.');
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
  };

  const cardStyles = {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '28rem',
    margin: '0 1.25rem',
  };

  const logoContainerStyles = {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  };

  const logoStyles = {
    width: '4rem',
    height: '4rem',
    backgroundColor: '#2563eb',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
  };

  const titleStyles = {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '0.5rem',
  };

  const subtitleStyles = {
    color: '#6b7280',
    fontSize: '1.125rem',
  };

  const formGroupStyles = {
    marginBottom: '1.5rem',
  };

  const labelStyles = {
    display: 'block',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
  };

  const inputStyles = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    transition: 'all 0.2s',
  };

  const buttonStyles = {
    width: '100%',
    backgroundColor: '#2563eb',
    color: 'white',
    fontWeight: '600',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
    opacity: loading ? 0.7 : 1,
  };

  const messageStyles = (isSuccess: boolean) => ({
    marginTop: '1rem',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    textAlign: 'center' as const,
    backgroundColor: isSuccess ? '#dcfce7' : '#fef2f2',
    color: isSuccess ? '#166534' : '#991b1b',
  });

  const spinnerStyles = {
    width: '1.25rem',
    height: '1.25rem',
    border: '2px solid white',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <div style={logoContainerStyles}>
          <div style={logoStyles}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/>
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <path d="M12 8v4"/>
              <path d="M12 12h.01"/>
            </svg>
          </div>
          <h1 style={titleStyles}>
            Welcome Back
          </h1>
          <p style={subtitleStyles}>
            Login to access your admin dashboard
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={formGroupStyles}>
            <label style={labelStyles}>Email Address</label>
            <input
              type="email"
              style={inputStyles}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div style={formGroupStyles}>
            <label style={labelStyles}>Password</label>
            <input
              type="password"
              style={inputStyles}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <button
            type="submit"
            style={buttonStyles}
            disabled={loading}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2563eb')}
          >
            {loading ? (
              <>
                <div style={spinnerStyles}></div>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>

          {message && (
            <div style={messageStyles(message.includes('successful'))}>
              {message}
            </div>
          )}
        </form>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;