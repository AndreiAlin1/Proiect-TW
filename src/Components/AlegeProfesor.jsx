import { useState } from "react";

const profesoriDummy = ["Zurini", "Toma", "Dorian Popa", "Miguel"];

function AlegeProfesor() {
  const [profesor, setProfesor] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [respins, setIsRespins] = useState(false);

  function handleIsSent() {
    setIsSent(true);
    //Aici vom trimite apoi spre baza de date profesorul ales
  }

  function handleRespingereColaborare() {
    setIsRespins(true);
  }

  function handleIntoarceLaAles() {
    setIsSent(false);
    setProfesor("");
    setIsRespins(false);
  }

  return (
    <>
      {isSent === false ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (profesor !== "") handleIsSent();
          }}
          className="profesorContainer"
        >
          <div className="profesorGroup">
            <label htmlFor="profesor">
              Alegeti profesorul coordonator dorit:
            </label>
            <select
              id="profesor"
              value={profesor}
              onChange={(e) => setProfesor(e.target.value)}
              required
            >
              <option>Selecteaza</option>
              {profesoriDummy.map((element) => (
                <option value={element}>{element}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="formButton"
            onClick={handleIsSent}
            disabled={!profesor}
          >
            Trimite
          </button>
        </form>
      ) : respins === false ? (
        <>
          <div className="paragrafContainer">
            <span className="pendingIcon">
              <i className="bi bi-clock"></i>
            </span>
            <p id="parafInstiintare">
              {profesor} a fost instiintat. Se aspteata un raspuns.
            </p>
          </div>
          <button onClick={handleRespingereColaborare}>Respingere</button>
        </>
      ) : (
        <>
          <div className="acceptareContainer">
            <i className="bi bi-x-circle-fill text-danger"></i>
            <p className="text-danger fw-bold mt-2">Colaborare respinsa</p>
          </div>
          <div className="acceptareContainerV2">
            <p>
              Cadrul didactic nu a putut incepe colaborarea cu tine pentru
              lucrarea de licenta.Va trebui sa incerci din nou alaturi de un alt
              profesor.
            </p>
            <button className="formButton" onClick={handleIntoarceLaAles}>
              Ok! Intoarce-ma la alesul profesorului!
            </button>
          </div>{" "}
        </>
      )}
    </>
  );
}

export default AlegeProfesor;
