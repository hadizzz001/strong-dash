"use client"

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const adminUsername = 'admin'; // Hardcoded admin username
    const adminPassword = 'admin'; // Hardcoded admin password

    if (username === adminUsername && password === adminPassword) {
      // Store login state in localStorage
      localStorage.setItem('isAdmin', 'true');
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleLogin} style={{ maxWidth: '400px', width: '100%', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Admin Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '1rem' }}>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ width: '100%', padding: '.5rem', marginTop: '.5rem' }} 
            required 
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '.5rem', marginTop: '.5rem' }} 
            required 
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '.75rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
