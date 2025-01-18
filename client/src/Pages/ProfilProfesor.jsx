import React, { useState, useEffect } from "react";
import "../Styles/ProfilProfesor.css";
import DropDown from "../Partials/DropDown";

function ProfilProfesor({
  numarElevi,
  intervalStart,
  setIntervalStart,
  intervalEnd,
  setIntervalEnd,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    console.log("Retrieved username:", storedName); // verificăm ce recuperăm

    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault(); // Previne refresh-ul paginii
    setShowPopup(true); // Afișează pop-up-ul
    setTimeout(() => {
      setShowPopup(false); // Ascunde pop-up-ul după 2 secunde
    }, 2000);
  }

  return (
    <>
      <DropDown />
      <div className="containerProfil">
        <h2>Editare date profesor</h2>
        <div className="profileIconContainer">
          <i className="bi bi-person-circle profileIcon"></i>
        </div>
        <h1>{userName}</h1>
        <form className="formContainer" onSubmit={handleFormSubmit}>
          <div className="formGroup">
            <label id="labelProfesor">
              Numar elevi pentru licenta: {numarElevi} (maxim 10)
            </label>
          </div>
          <div className="formGroup">
            <label style={{ fontWeight: "300" }} id="labelProfesor">
              Interval in care studentii pot depune cereri catre dumneavoastra:
            </label>
            <label htmlFor="intervalStart">Data început:</label>
            <input
              type="date"
              id="intervalStart"
              value={intervalStart || ""}
              onChange={(e) => setIntervalStart(e.target.value)}
              required
            />
            <label htmlFor="intervalEnd">Data sfârșit:</label>
            <input
              type="date"
              id="intervalEnd"
              value={intervalEnd || ""}
              onChange={(e) => setIntervalEnd(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="formButton">
            Salveaza Date
          </button>
        </form>
      </div>
      {showPopup && (
        <div className="popupMessage">
          <p>Datele au fost salvate cu succes!</p>
          <i className="bi bi-check-circle-fill text-success"></i>
        </div>
      )}
    </>
  );
}

export default ProfilProfesor;
