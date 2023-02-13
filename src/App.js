import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './root/login';
import Admin from './root/admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
