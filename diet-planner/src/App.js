import React, { useState } from "react";
import axios from "axios";
import "./App.css";


function App() {
const [form, setForm] = useState({ age: '', weight: '', height: '', dietType: 'veg' });
const [result, setResult] = useState(null);


const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });


const submit = async () => {
const res = await axios.post("http://localhost:5000/calculate", form);
setResult(res.data);
};


return (
<div className="container">
<h1>🥗 Personalized Diet Planner</h1>
<div className="card">
<input name="age" placeholder="Age" onChange={handleChange} />
<input name="weight" placeholder="Weight (kg)" onChange={handleChange} />
<input name="height" placeholder="Height (cm)" onChange={handleChange} />
<select name="dietType" onChange={handleChange}>
<option value="veg">Vegetarian</option>
<option value="nonveg">Non-Vegetarian</option>
</select>
<button onClick={submit}>Generate Plan</button>
</div>


{result && (
<div className="result">
<h2>BMI: {result.bmi} ({result.category})</h2>
<p><b>Goal:</b> {result.dietPlan.goal}</p>
<p><b>Diet:</b> {result.dietPlan.diet.join(', ')}</p>
<p><b>Protein:</b> {result.dietPlan.protein}</p>
<p><b>Carbs:</b> {result.dietPlan.carbs}</p>
<p><b>Fats:</b> {result.dietPlan.fats}</p>
<p><b>Water Intake:</b> {result.water}</p>
<p><b>Exercise:</b> {result.exercise}</p>
<p className="motivation">{result.motivation}</p>
</div>
)}
</div>
);
}


export default App;