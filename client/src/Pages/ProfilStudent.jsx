import React from "react";
import "../Styles/ProfilStudent.css";
import DropDownElev from "../Partials/DropDownElev";
import { useState, useEffect } from "react";

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
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    console.log("Retrieved username:", storedName); // verificăm ce recuperăm

    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  async function handleFormSubmit(e) {
    onSubmit(e);
    setShowPopup(false);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    try {
      const studentId = sessionStorage.getItem("userId");
      const studentInfo = 
      {
      major: specializare,
      series: serie,
      cls: grupa,
      }
      const response = await fetch(`http://localhost:3001/api/students/updateProfile/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-type":"application/json"
        },
        body:JSON.stringify(studentInfo)
      });

      const data = await response.json();

      if (response.ok) {
        setShowPopup(false);
        setTimeout(() => {
          setShowPopup(true);
        },2000);
      } else {
        console.error("Error response", data);
      }
    } catch(err) {
      console.error("Error updating student info:", err);
    }
  }
  return (
    <>
      <DropDownElev />
      <div className="containerProfil">
        <h2>Editare date personale</h2>
        <div className="profileIconContainer">
          <i className="bi bi-person-circle profileIcon"></i>
        </div>
        <h1>{userName}</h1>

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
