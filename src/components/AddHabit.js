import { useState } from "react";
import axios from "axios";

function AddHabit() {
  const [habit_name, setHabitName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    // 1. Basic validation
    if (!habit_name || !description) {
      alert("Please fill in both fields");
      return;
    }

    // 2. Check if token exists before even trying
    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    try {
      await axios.post(
        "/api/habits", // 3. Simplified URL thanks to your package.json proxy
        { habit_name, description },
        {
          headers: { 
            // 4. ADDED 'Bearer ' prefix here
            Authorization: `Bearer ${token}` 
          },
        }
      );

      alert("Habit added successfully! ");
      
      // Clear inputs
      setHabitName("");
      setDescription("");
    } catch (err) {
      console.error("Add Habit Error:", err.response?.data || err.message);
      
      // Improved error message
      const errorMsg = err.response?.data?.message || "Make sure you are logged in.";
      alert(`Failed to add habit: ${errorMsg}`);
    }
  };

  return (
    <div className="container">
      <h2>Create New Habit</h2>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Habit Name (e.g., Morning Run)"
          value={habit_name}
          onChange={(e) => setHabitName(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Description (e.g., 5km at 7 AM)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <button onClick={handleSubmit}>
          Save Habit
        </button>
      </div>
    </div>
  );
}

export default AddHabit;