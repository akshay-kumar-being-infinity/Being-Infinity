import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import googleIcon from '../assets/google-icon.png';
import profileIcon from '../assets/profile-icon.png';
import signoutIcon from '../assets/signout-icon.png';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user_info');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setIsDropdownOpen(false);
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
    localStorage.removeItem('google_access_token');
    setUser(null);
    navigate('/');
  };
  
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MyApp
          </Link>
          
          <div className="flex space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                location.pathname === '/' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/contact" 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                location.pathname === '/contact' 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Contact
            </Link>

            {user ? (
              // If User IS Logged In
              <div className="relative ml-2" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <img 
                    src={user.picture} 
                    alt="User Profile" 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-bg-surface rounded-xl shadow-2xl border border-border overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-5 py-4 bg-bg-elevated border-b border-border flex items-center gap-3">
                      <div className="shrink-0 flex items-center justify-center">
                         <img src={googleIcon} alt="Google" className="w-5 h-5 object-contain" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Signed in as</span>
                        <span className="text-sm font-semibold text-text-primary truncate" title={user.email}>
                          {user.email}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2 space-y-1">
                      <Link 
                        to="#" 
                        className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-text-primary rounded-lg hover:bg-bg-elevated hover:text-primary-light transition-colors group"
                      >
                         <img src={profileIcon} alt="Profile" className="w-5 h-5 mr-3 object-contain" />
                         Profile
                      </Link>

                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-400 rounded-lg hover:bg-bg-elevated hover:text-red-300 transition-colors group cursor-pointer"
                      >
                         <img src={signoutIcon} alt="Sign Out" className="w-5 h-5 mr-3 object-contain" />
                         Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                location.pathname === '/login' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Login
            </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
