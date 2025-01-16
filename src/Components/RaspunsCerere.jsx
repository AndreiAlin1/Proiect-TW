import React, { useState } from "react";

function RaspunsCerere() {
  const [primita, setIsPrimita] = useState(false);

  function handlePrimireCerere() {
    setIsPrimita(true);
  }

  return primita === false ? (
    <>
      <div className="raspunsCerere">
        <div className="iconContainer">
          <i className="bi bi-three-dots text-accent"></i>
        </div>
        <p className="raspunsText">
          Cererea ta a fost trimisă. Se așteaptă lucrarea semnată de către
          profesorul coordonator.
        </p>
      </div>
      <button onClick={handlePrimireCerere}>A venit</button>
    </>
  ) : (
    <>
      <div className="acceptareContainer">
        <i className="bi bi-check-circle-fill text-success"></i>
        <p className="text-success fw-bold mt-2">Succes</p>
      </div>
      <div className="acceptareContainerV2">
        <p>
          Cererea ta a fost semnata de catre profesorul coordonator. O poti
          descarca mai jos.
        </p>
        <p>Spor la lucru!</p>
        <a
          href="/path/to/file.pdf" // Aici vei schimba cu link-ul către fișierul tău din server
          download="Cerere_Semnata.pdf"
          className="formButton mt-3"
        >
          Descarcă Documentul
        </a>
      </div>
    </>
  );
}

export default RaspunsCerere;
