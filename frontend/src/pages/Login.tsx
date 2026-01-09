import logo from "../assets/logo.png";
import { useEffect, useCallback, useRef } from 'react';
import { config } from '../config';

declare global {
  interface Window {
    handleGoogleSuccess: (response: any) => void;
    google: any;
  }
}

export default function Login() {
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const handleGoogleSuccess = useCallback(async (response: any) => {
    const idToken = response.credential;
    console.log('idToken sent to backend:', idToken?.slice(0, 20) + '...');

    try {
      const res = await fetch(`${config.baseUrl}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      console.log('Backend response:', data);

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_info', JSON.stringify(data.user));
        window.location.href = '/';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Backend call failed:', error);
      alert('Check backend at localhost:3000');
    }
  }, []);

  useEffect(() => {
    // Global callback for Google
    (window as any).handleGoogleSuccess = handleGoogleSuccess;

    // Load GIS SDK
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => {
        // Initialize GIS button inside your custom button
        if (googleButtonRef.current && window.google?.accounts) {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleSuccess,
            auto_select: false,
            cancel_on_tap_outside: false,
          });
          window.google.accounts.id.renderButton(
            googleButtonRef.current,
            { theme: 'filled_black', size: 'large', type: 'standard', text: 'signin_with', shape: 'pill', logo_alignment: 'left'}
          );
        }
      };
      document.head.appendChild(script);
    }
  }, [handleGoogleSuccess]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-bg-dark overflow-hidden font-sans text-text-primary selection:bg-primary-light selection:text-bg-dark">
      <div className="relative w-full max-w-md p-8 bg-bg-surface border border-border rounded-2xl">
        {/* ✅ YOUR UI UNCHANGED */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center justify-center">
            <img src={logo} alt="Being Infinity" className="h-20 w-20 object-contain" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-2">Welcome</h1>
          <p className="text-text-muted text-sm">Sign in to get started!</p>
        </div>

        <div className="flex justify-center">
          <div ref={googleButtonRef}></div>
        </div>

        {/* ✅ Footer unchanged */}
        <div className="mt-8 text-center">
          <p className="text-xs text-text-muted">
            Skip & continue to{" "}
            <a href="/" className="underline hover:text-primary-light transition-colors">Home</a>.
          </p>
        </div>
      </div>
      <div className="absolute bottom-6 text-text-muted text-xs opacity-50">© 2025 Being Infinity</div>
    </div>
  );
}
