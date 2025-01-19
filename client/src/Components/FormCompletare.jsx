import React, { useState, memo, useCallback } from "react";

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
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    specializare: "",
    titluLucrare: "",
    serie: "",
    grupa: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "serie" ? value.toUpperCase() : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(formData);
    console.log("Form data at submit:", formData);

    const studentId = sessionStorage.getItem("userId");
    console.log("Student ID:", studentId);

    // Step 1: Add Thesis
    try {
      const response = await fetch(`http://localhost:3001/api/thesis/insertThesis/${studentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titlu_lucrare: formData.titluLucrare }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        console.error("Error response:", data.message);
        return;
      }

      // Assuming thesisId is returned as part of the response
      const thesisId = data?.thesisId;
      if (thesisId) {
        // Step 2: Store thesisId in sessionStorage
        sessionStorage.setItem("thesisId", thesisId);
      }
    } catch (err) {
      console.error("Error adding thesis:", err);
      setError("Failed to add thesis. Please try again later.");
      return;
    }

    // Step 3: Update Student Info
    try {
      const thesisId = sessionStorage.getItem("thesisId");
      const studentInfo = {
        major: formData.specializare,
        series: formData.serie,
        cls: formData.grupa,
        lucrare: thesisId,
      };

      const response = await fetch(`http://localhost:3001/api/students/updateInfo/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentInfo),
      });

      const data = await response.json();

      if (response.ok) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      } else {
        setError(data.message || "Something went wrong");
        console.error("Error response:", data);
      }
    } catch (err) {
      console.error("Error updating student info:", err);
      setError("Failed to update student info. Please try again later.");
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit} className="formContainer">
        <div className="formGroup">
          <label htmlFor="specializare">Specializare:</label>
          <select
            id="specializare"
            name="specializare"
            value={formData.specializare}
            onChange={handleChange}
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
            name="titluLucrare"
            type="text"
            value={formData.titluLucrare}
            onChange={handleChange}
            placeholder="Ex: Computer cuantic"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="serie">Serie:</label>
          <input
            id="serie"
            name="serie"
            type="text"
            value={formData.serie}
            onChange={handleChange}
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
            name="grupa"
            type="number"
            value={formData.grupa}
            onChange={handleChange}
            placeholder="Ex: 101"
            required
          />
        </div>

        <button type="submit" className="formButton">
          Trimite
        </button>
      </form>
      {error && (
        <div className="alert alert-danger text-center mb-3">
          {error}
        </div>
      )}
      {showPopup && (
        <div className="popupMessage">
          <p>Datele au fost salvate cu succes!</p>
          <i className="bi bi-check-circle-fill text-success"></i>
        </div>
      )}
    </>
  );
}

export default memo(FormCompletare);
