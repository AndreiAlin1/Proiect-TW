import { useState } from "react";

const profesoriDummy = ["Zurini", "Toma", "Dorian Popa", "Miguel"];

function AlegeProfesor() {
  const [profesor, setProfesor] = useState("");
  const [isSent, setIsSent] = useState(false);

  function handleIsSent() {
    setIsSent(true);
    //Aici vom trimite apoi spre baza de date profesorul ales
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
      ) : (
        <div className="paragrafContainer">
          <span className="pendingIcon">
            <i className="bi bi-clock"></i> Pending
          </span>
          <p>
            Profesorul coordonator a fost instiintat. Se aspteata un raspuns.
          </p>
        </div>
      )}
    </>
  );
}

export default AlegeProfesor;
