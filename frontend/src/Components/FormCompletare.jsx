import React, { useState } from "react";

function FormCompletare() {
  const [specializare, setSpecializare] = useState("");
  const [serie, setSerie] = useState("");
  const [grupa, setGrupa] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Specializare:", specializare);
    console.log("Serie:", serie);
    console.log("Grupa:", grupa);
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <div className="formGroup">
        <label htmlFor="specializare">Specializare:</label>
        <select
          id="specializare"
          value={specializare}
          onChange={(e) => setSpecializare(e.target.value)}
          required
        >
          <option value="">Selectează</option>
          <option value="Informatica Economica">Informatica Economica</option>
          <option value="Cibernetica">Cibernetica</option>
          <option value="Statistica">Statistica</option>
        </select>
      </div>

      <div className="formGroup">
        <label htmlFor="serie">Serie:</label>
        <input
          id="serie"
          type="text"
          value={serie}
          onChange={(e) => setSerie(e.target.value.toUpperCase())}
          maxLength="1"
          pattern="[A-Za-z]"
          placeholder="Ex: A"
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="grupa">Grupa:</label>
        <input
          id="grupa"
          type="number"
          value={grupa}
          onChange={(e) => setGrupa(e.target.value)}
          placeholder="Ex: 101"
          required
        />
      </div>

      <button type="submit" className="formButton">
        Trimite
      </button>
    </form>
  );
}

export default FormCompletare;
