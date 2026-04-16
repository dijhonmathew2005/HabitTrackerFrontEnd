import { useEffect, useState } from "react";
import axios from "axios";

function HabitList() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchHabits = async () => {
    const token = localStorage.getItem("token");

    // Standard practice: check if token exists before trying the request
    if (!token) {
      console.error("No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("https://habittracker-2-zhcw.onrender.com/api/habits", {
        headers: { 
          // Prefixed with 'Bearer ' which is standard for JWT
          Authorization: `Bearer ${token}` 
        },
      });

      setHabits(res.data);
    } catch (err) {
      console.error("Error fetching habits:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteHabit = async (id) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this habit?")) {
      try {
        await axios.delete(`https://habittracker-2-zhcw.onrender.com/api/habits/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Optimistic UI update: remove from local state immediately 
        // so the user doesn't wait for the secondary fetch
        setHabits(habits.filter((h) => h.habit_id !== id));
      } catch (err) {
        console.error("Error deleting habit:", err);
        alert("Failed to delete habit. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <div className="container"><p>Loading your habits...</p></div>;
  }

  return (
    <div className="container">
      <h2>Your Habits</h2>
      
      {habits.length === 0 ? (
        <p style={{ color: "#666" }}>No habits tracked yet. Start by adding one!</p>
      ) : (
        habits.map((h) => (
          <div key={h.habit_id} className="habit-card">
            <div className="habit-info">
              <h3>{h.habit_name}</h3>
              {/* Added a fallback for empty descriptions */}
              <p>{h.description || "No description provided."}</p>
            </div>
            <button 
              className="delete-btn" 
              onClick={() => deleteHabit(h.habit_id)}
              aria-label={`Delete ${h.habit_name}`}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default HabitList;