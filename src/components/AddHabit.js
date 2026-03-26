import { useState } from "react";
import axios from "axios";

function AddHabit() {
  const [habit_name, setHabitName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    
    if (!habit_name || !description) {
      alert("Please fill in both fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/habits",
        { habit_name, description },
        {
          headers: { Authorization: token },
        }
      );

      alert("Habit added successfully! ");
      
      
      setHabitName("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to add habit. Make sure you are logged in.");
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