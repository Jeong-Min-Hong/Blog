import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './root/login';
import Admin from './root/admin';
import Home from './root/home';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App;
