import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Onboarding } from "./pages/Onboarding";
import { ProtectedRoute } from "./components/ProtectedRoute";
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/courses" 
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/onboarding" 
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </div>
  );
}

export default App;
