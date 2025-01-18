import React from "react";
import { useState } from "react";

function FormCompletare({
  onSubmit,
  specializare,
  setSpecializare,
  titluLucrare,
  setTitluLucrare,
  serie,
  setSerie,
  grupa,
  setGrupa,
}) {
  const [showPopup, setShowPopup] = useState(false);

  function handleFormSubmit(e) {
    onSubmit(e);
    setShowPopup(true); // Afișează pop-up-ul
    setTimeout(() => {
      setShowPopup(false); // Ascunde pop-up-ul după 3 secunde
    }, 2000);
  }
  return (
    <>
      <form onSubmit={handleFormSubmit} className="formContainer">
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
          <label htmlFor="grupa">Titlu lucrare licenta:</label>
          <input
            id="grupa"
            type="text"
            value={titluLucrare}
            onChange={(e) => setTitluLucrare(e.target.value)}
            placeholder="Ex: Computer cuantic"
            required
          />
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
      {showPopup && (
        <div className="popupMessage">
          <p>Datele au fost salvate cu succes!</p>
          <i className="bi bi-check-circle-fill text-success"></i>
        </div>
      )}
    </>
  );
}

export default FormCompletare;
