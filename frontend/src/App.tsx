import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/Contact';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Onboarding } from "./pages/Onboarding";

function App() {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </div>
  );
}

export default App;
