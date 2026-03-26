import { useEffect, useState } from "react";
import axios from "axios";

function HabitList() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "http://localhost:5000/api/habits",
        {
          headers: { Authorization: token },
        }
      );

      setHabits(res.data);
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  };

  const deleteHabit = async (id) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this habit?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/habits/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        fetchHabits(); 
      } catch (err) {
        console.error("Error deleting habit:", err);
      }
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="container">
      <h2>Your Habits</h2>
      
      {habits.length === 0 ? (
        <p style={{ color: "#666" }}>No habits tracked yet. Start by adding one!</p>
      ) : (
        habits.map((h) => (
          <div key={h.habit_id} className="habit-card">
            <div>
              <h3>{h.habit_name}</h3>
              <p>{h.description}</p>
            </div>
            <button className="delete-btn" onClick={() => deleteHabit(h.habit_id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default HabitList;