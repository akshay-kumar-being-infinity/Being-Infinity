import logo from "../assets/logo.png";
export default function Login() {
  const handleGoogleLogin = () => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    
    // Define the scopes.
    const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
    
    // Construct the Google OAuth URL.
    const targetUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodeURIComponent(redirectUri)}&prompt=consent&response_type=token&client_id=${googleClientId}&scope=${encodeURIComponent(scope)}`;

    // Redirect the browser to Google
    console.log("Redirecting to:", targetUrl);
    window.location.href = targetUrl;
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-bg-dark overflow-hidden font-sans text-text-primary selection:bg-primary-light selection:text-bg-dark">
      
      <div className="relative w-full max-w-md p-8 bg-bg-surface border border-border rounded-2xl">
        
        <div className="flex flex-col items-center text-center mb-8">

          <div className="flex items-center justify-center">
            <img 
              src={logo} 
              alt="Being Infinity" 
              className="h-20 w-20 object-contain" 
            />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-2">
            Welcome
          </h1>
          <p className="text-text-muted text-sm">
            Sign in to get started!
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="group w-full flex items-center justify-center cursor-pointer gap-3 bg-bg-elevated hover:bg-bg-elevated/80 border border-border hover:border-primary-light/50 text-text-primary font-medium py-3.5 px-4 rounded-xl transition-all duration-300 ease-in-out "
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="group-hover:text-primary-light transition-colors duration-300">
              Continue with Google
            </span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-text-muted">
            Skip & continue to{" "}
            <a href="/" className="underline hover:text-primary-light transition-colors">
              Home
            </a>
            .
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 text-text-muted text-xs opacity-50">
        © 2025 Being Infinity
      </div>
    </div>
  );
}