import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to read user from local storage
  const loadUser = () => {
    const storedUser = localStorage.getItem('user_info');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    setIsDropdownOpen(false);

    const handleUserUpdate = () => loadUser();
    window.addEventListener("user_updated", handleUserUpdate);

    return () => window.removeEventListener("user_updated", handleUserUpdate);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_info');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-bg-dark/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* --- LEFT: LOGO & Being Infinity --- */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-light/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img src={logo} alt="Being Infinity" className="h-9 w-9 object-contain relative z-10" />
            </div>
            <span className="text-xl font-bold tracking-tight text-text-primary group-hover:text-primary-light transition-colors duration-300">
              Being Infinity
            </span>
          </Link>

          {/* --- MIDDLE: NAVIGATION LINKS --- */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 ${isActive('/')
                  ? 'text-primary-light'
                  : 'text-text-muted hover:text-text-primary'
                }`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors duration-200 ${isActive('/courses')
                  ? 'text-primary-light'
                  : 'text-text-muted hover:text-text-primary'
                }`}
            >
              Courses
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors duration-200 ${isActive('/about')
                  ? 'text-primary-light'
                  : 'text-text-muted hover:text-text-primary'
                }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors duration-200 ${isActive('/contact')
                  ? 'text-primary-light'
                  : 'text-text-muted hover:text-text-primary'
                }`}
            >
              Contact
            </Link>

          </div>

          {/* --- RIGHT: USER ACTIONS --- */}
          <div className="flex items-center">
            {user ? (
              <div className="relative ml-3" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`
                    flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-all duration-200 cursor-pointer
                    ${isDropdownOpen ? 'bg-bg-elevated border-primary-light/50 ring-1 ring-primary-light/20' : 'bg-bg-surface border-border hover:border-text-muted'}
                  `}
                >
                  <img src={user.picture} alt="User" className="h-8 w-8 rounded-full object-cover border border-border" referrerPolicy="no-referrer" />
                  <span className="text-sm font-medium text-text-primary max-w-[100px] truncate hidden sm:block">
                    {user.given_name || "User"}
                  </span>
                  <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 origin-top-right bg-bg-elevated border border-border rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-5 py-4 border-b border-border bg-bg-surface/50">
                      <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Signed in as</p>
                      <p className="text-sm font-medium text-text-primary truncate mt-0.5" title={user.email}>
                        {user.email}
                      </p>
                    </div>

                    <div className="p-1.5 space-y-0.5">
                      <Link to="/profile" className="flex items-center w-full px-3 py-2.5 text-sm text-text-primary rounded-lg hover:bg-bg-surface hover:text-primary-light transition-colors group">
                        <svg className="w-4 h-4 mr-3 text-text-muted group-hover:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>

                      {/* DYNAMIC SETUP LINK */}
                      <Link to="/onboarding" className="flex items-center w-full px-3 py-2.5 text-sm text-text-primary rounded-lg hover:bg-bg-surface hover:text-primary-light transition-colors group">
                        {user.isProfileComplete ? (
                          <svg className="w-4 h-4 mr-3 text-text-muted group-hover:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 mr-3 text-text-muted group-hover:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        )}
                        {user.isProfileComplete ? "Update Profile" : "Complete Setup"}
                      </Link>

                      <div className="h-px bg-border/50 my-1 mx-2" />

                      <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 text-sm text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer group">
                        <svg className="w-4 h-4 mr-3 text-red-400/70 group-hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="group relative px-6 py-2 rounded-xl bg-primary-dark text-white text-sm font-semibold shadow-lg shadow-primary-dark/20 hover:bg-primary-light hover:shadow-primary-light/30 transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}