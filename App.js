import React, { useState } from "react";
import axios from "axios";

function App() {
  const [soilMoisture, setSoilMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5000/predict", {
      soil_moisture: soilMoisture,
      temperature: temperature,
    });
    setStatus(response.data.health_status);
  };

  return (
    <div>
      <label>Soil Moisture: <input type="number" onChange={e => setSoilMoisture(e.target.value)} /></label>
      <label>Temperature: <input type="number" onChange={e => setTemperature(e.target.value)} /></label>
      <button onClick={handleSubmit}>Get Crop Health Prediction</button>
      {status && <p>Crop Health Status: {status}</p>}
    </div>
  );
}

export default App;
