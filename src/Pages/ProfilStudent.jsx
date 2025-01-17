import React from "react";
import "../Styles/ProfilStudent.css";
import DropDownElev from "../Partials/DropDownElev";
import { useState } from "react";

function ProfilStudent({
  onSubmit,
  specializare,
  setSpecializare,
  grupa,
  setGrupa,
  serie,
  setSerie,
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
      <DropDownElev />
      <div className="containerProfil">
        <h2>Editare date personale</h2>
        <div className="profileIconContainer">
          <i className="bi bi-person-circle profileIcon"></i>
        </div>
        <h1>Nume User</h1>

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
              <option value="Informatica Economica">
                Informatica Economica
              </option>
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
              required
            />
          </div>

          <button type="submit" className="formButton">
            Salveaza Date
          </button>
        </form>
      </div>
      {/* Pop-up-ul */}
      {showPopup && (
        <div className="popupMessage">
          <p>Datele au fost salvate cu succes!</p>
          <i className="bi bi-check-circle-fill text-success"></i>
        </div>
      )}
    </>
  );
}
export default ProfilStudent;
