import React, { useState } from "react";

function AcceptareColaborare() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      alert(`Fișierul ${selectedFile.name} a fost încărcat cu succes.`);
    } else {
      alert("Te rugăm să selectezi un fișier înainte de a trimite.");
    }
  };

  return (
    <div>
      <div className="acceptareContainer">
        <i className="bi bi-check-circle-fill text-success"></i>
        <p className="text-success fw-bold mt-2">Succes</p>
      </div>
      <div className="acceptareContainerV2">
        <p>
          Cererea ta de colaborare a fost acceptată de către profesor. Încarcă
          mai jos documentul pentru a-l trimite către cadrul didactic pentru
          semnătură.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="file"
              id="fileInput"
              className="form-control visually-hidden"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="fileInput" className="custom-file-upload">
              <span className="custom-file-button">Choose File</span>
              {selectedFile && (
                <span className="custom-file-label">{selectedFile.name}</span>
              )}
            </label>
          </div>
          <button type="submit" className="formButton">
            Trimite Fișier
          </button>
        </form>
      </div>
    </div>
  );
}

export default AcceptareColaborare;
