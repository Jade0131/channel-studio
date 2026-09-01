import { useState, useCallback } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const STORAGE_KEY = 'channel-studio-auth';
const APP_PASSWORD = import.meta.env.VITE_APP_PASSWORD || 'channel-studio-2026';

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (password === APP_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setAuthenticated(true);
      setError('');
    } else {
      setError('Wrong password');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  }, [password]);

  if (authenticated) return <>{children}</>;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated particles background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(120, 40, 200, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(60, 20, 120, 0.1) 0%, transparent 50%)',
        animation: 'pulse 8s ease-in-out infinite',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: 420,
        padding: 48,
        background: 'rgba(15, 10, 30, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(120, 40, 200, 0.3)',
        borderRadius: 20,
        boxShadow: '0 0 60px rgba(120, 40, 200, 0.15), 0 25px 50px rgba(0,0,0,0.5)',
        textAlign: 'center',
        animation: shaking ? 'shake 0.5s ease-in-out' : 'fadeIn 0.6s ease-out',
      }}>
        <div style={{
          width: 72, height: 72,
          margin: '0 auto 24px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
        }}>
          <Lock size={32} color="#fff" />
        </div>

        <h1 style={{
          fontSize: 28, fontWeight: 700, color: '#e2e8f0',
          margin: '0 0 8px', letterSpacing: '-0.5px',
        }}>
          Channel Studio
        </h1>
        <p style={{
          fontSize: 14, color: '#94a3b8', margin: '0 0 32px',
        }}>
          Enter password to access your workspace
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Password"
              autoFocus
              style={{
                width: '100%',
                padding: '14px 48px 14px 16px',
                fontSize: 15,
                background: 'rgba(30, 20, 60, 0.8)',
                border: `1px solid ${error ? '#ef4444' : 'rgba(120, 40, 200, 0.3)'}`,
                borderRadius: 12,
                color: '#e2e8f0',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                color: '#94a3b8',
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p style={{ color: '#ef4444', fontSize: 13, margin: '0 0 16px' }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px 0',
              fontSize: 15,
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Enter Workspace
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-10px); } 40% { transform: translateX(10px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(6px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
      `}</style>
    </div>
  );
}
