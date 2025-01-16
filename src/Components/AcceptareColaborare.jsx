import React, { useState } from "react";

function AcceptareColaborare() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Aici se va adăuga logica pentru încărcarea fișierului
      alert(`Fișierul ${selectedFile.name} a fost încărcat cu succes.`);
    } else {
      alert("Te rugăm să selectezi un fișier înainte de a trimite.");
    }
  };

  return (
    <div>
      <div className="acceptareContainer ">
        <i
          className="bi bi-check-circle-fill text-success"
          style={{ fontSize: "2rem", backgroundColor: "#2c2c2c;" }}
        ></i>
        <p
          className="text-success fw-bold mt-2"
          style={{ backgroundColor: "#2c2c2c;" }}
        >
          Succes
        </p>
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
              className="form-control"
              onChange={handleFileChange}
              required
            />
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
