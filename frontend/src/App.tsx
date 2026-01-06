import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/Contact';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1)); 
      const accessToken = params.get('access_token');

      if (accessToken) {
        localStorage.setItem('google_access_token', accessToken);
        window.history.replaceState(null, '', window.location.pathname);
        
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => response.json())
        .then(userData => {
          console.log("User Logged In:", userData);
          localStorage.setItem('user_info', JSON.stringify(userData));
          navigate('/');
        })
        .catch(error => console.error("Error:", error));
      }
    }
  }, [navigate]);
    
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
