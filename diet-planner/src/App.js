import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    dietType: "veg",
  });

  const [result, setResult] = useState(null);
  const [place, setPlace] = useState("gym");
  const [workout, setWorkout] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/calculate", form);
      setResult(res.data);

      const workoutRes = await axios.post("http://localhost:5000/workout", {
        bmi: res.data.bmi,
        place: place,
      });
      setWorkout(workoutRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="container">
        {/* HEADER */}
        <div className="header">
          <h1>🥗 Personalized Diet Planner</h1>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* INPUT CARD */}
        <div className="card">
          <input name="age" placeholder="Age" onChange={handleChange} />
          <input name="weight" placeholder="Weight (kg)" onChange={handleChange} />
          <input name="height" placeholder="Height (cm)" onChange={handleChange} />

          <select name="dietType" onChange={handleChange}>
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
          </select>

          <select onChange={(e) => setPlace(e.target.value)}>
            <option value="gym">Gym Workout</option>
            <option value="home">Home Workout</option>
          </select>

          <button onClick={submit}>Generate Plan</button>
        </div>

        {/* RESULTS */}
        {result && (
          <>
            {/* SUMMARY */}
            <div className="summary-bar">
              <div className="summary-item">
                <span>BMI</span>
                <strong>{result.bmi}</strong>
              </div>
              <div className="summary-item">
                <span>Category</span>
                <strong>{result.category}</strong>
              </div>
              <div className="summary-item">
                <span>Goal</span>
                <strong>{result.dietPlan.goal}</strong>
              </div>
            </div>

            {/* MAIN */}
            <div className="results-row">
              {/* DIET */}
              <div className="result-card">
                <h3>🥗 Diet & Nutrition</h3>

                <div className="info-row">
                  <span>Diet</span>
                  <strong>{result.dietPlan.diet.join(", ")}</strong>
                </div>

                <div className="info-grid">
                  <div className="badge protein">
                    Protein: {result.dietPlan.protein}
                  </div>
                  <div className="badge carbs">
                    Carbs: {result.dietPlan.carbs}
                  </div>
                  <div className="badge fats">
                    Fats: {result.dietPlan.fats}
                  </div>
                </div>

                <div className="info-row">
                  <span>Water Intake</span>
                  <strong>{result.water}</strong>
                </div>

                <p className="motivation">{result.motivation}</p>
              </div>

              {/* WORKOUT */}
              {workout && (
                <div className="workout-card">
                  <h3>🏋️ Workout Plan</h3>
                  <span className="workout-goal">{workout.goal}</span>

                  {workout.workout.map((w, i) => (
                    <div className="workout-item" key={i}>
                      <strong>{w.exercise}</strong>
                      <span>{w.sets} × {w.reps}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
