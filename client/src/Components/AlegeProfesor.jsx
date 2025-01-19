import { useEffect, useState } from "react";

const getProf = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/professors/getAllProf", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Api response for debug:", data);
    if (!response.ok) {
      throw new Error(data.message || "Network response is not ok!");
    }

    console.log("Filtered data:", data.data);

    return data.data.filter(prof => prof.nr_elevi < 10); // proprietatea data din response tine informatia de la return
  } catch (err) {
    console.log("Error fetching professors!", err);
    throw err;
  }
};

function AlegeProfesor() {
  const [professors, setProfessors] = useState([]); // Array of all professors
  const [selectedProfesor, setSelectedProfesor] = useState(""); // Selected professor
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [respins, setIsRespins] = useState(false);

  useEffect(() => {
    const loadProf = async () => {
      try {
        setIsLoading(true);
        const data = await getProf();

        if (data.length === 0) {
          setError("Nu există momentan profesori disponibili pentru coordonare.");
          return;
        }

        setProfessors(data);
        setError(null);
      } catch (err) {
        setError("Nu s-au putut încărca profesorii. Vă rugăm încercați mai târziu.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProf();
  }, []);

  function handleIsSent() {
    setIsSent(true);
    //Aici vom trimite apoi spre baza de date profesorul ales
  }

  function handleRespingereColaborare() {
    setIsRespins(true);
  }

  function handleIntoarceLaAles() {
    setIsSent(false);
    setSelectedProfesor("");
    setIsRespins(false);
  }

  if (isLoading) {
    return <div>Se încarcă...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      {isSent === false ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (selectedProfesor !== "") handleIsSent();
          }}
          className="profesorContainer"
        >
          <div className="profesorGroup">
            <label htmlFor="profesor">
              Alegeti profesorul coordonator dorit:
            </label>
            <select
              id="profesor"
              value={selectedProfesor}
              onChange={(e) => setSelectedProfesor(e.target.value)}
              required
            >
              <option value="">Selecteaza</option>
              {professors.map((prof) => (
                <option key={prof.id} value={prof.nume_complet}>
                  {prof.nume_complet}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="formButton"
            disabled={!selectedProfesor}
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
              {selectedProfesor} a fost instiintat. Se asteapta un raspuns.
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
              lucrarea de licenta. Va trebui sa incerci din nou alaturi de un alt
              profesor.
            </p>
            <button className="formButton" onClick={handleIntoarceLaAles}>
              Ok! Intoarce-ma la alesul profesorului!
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default AlegeProfesor;