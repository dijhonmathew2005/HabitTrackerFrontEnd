import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Habit Tracker</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/habits">Habits</Link>
        <Link to="/habits/new">Add Habit</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;