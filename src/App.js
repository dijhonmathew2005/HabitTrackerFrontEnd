import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Habits from "./pages/Habits";
import Login from "./components/Login";
import AddHabit from "./components/AddHabit";
import Navbar from "./components/Navbar";
import "./App.css"; 

function App() {
  return (
    <Router>
      <Navbar />
      {}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/habits/new" element={<AddHabit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;