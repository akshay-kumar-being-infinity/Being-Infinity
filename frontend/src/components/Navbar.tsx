import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
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
          </div>
        </div>
      </div>
    </nav>
  );
}
