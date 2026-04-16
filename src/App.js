import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Habits from "./pages/Habits";
import Login from "./components/Login";
import Register from "./components/Register"; 
import AddHabit from "./components/AddHabit";
import Navbar from "./components/Navbar";
import "./App.css"; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Habits Dashboard */}
          <Route path="/habits" element={<Habits />} />
          
          {/* Habit Creation - Supporting both common URL patterns */}
          <Route path="/add-habit" element={<AddHabit />} /> 
          <Route path="/habits/new" element={<AddHabit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;