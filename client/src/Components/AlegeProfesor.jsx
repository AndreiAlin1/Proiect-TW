import { useEffect, useState } from "react";

const getProf = async () => {
  try {
    const response = await fetch(
      "http://localhost:3001/api/professors/getAllProf",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("Api response for debug:", data);
    if (!response.ok) {
      throw new Error(data.message || "Network response is not ok!");
    }

    console.log("Filtered data:", data.data);

    const today = new Date().toISOString().split("T")[0];
    return data.data.filter(
      (prof) =>
        prof.nr_elevi < 10 &&
        today >= prof.perioada_start &&
        today <= prof.perioada_final
    ); // proprietatea data din response tine informatia de la return
  } catch (err) {
    console.log("Error fetching professors!", err);
    throw err;
  }
};

function AlegeProfesor() {
  const [professors, setProfessors] = useState([]); // Array of all professors
  const [selectedProfesor, setSelectedProfesor] = useState(null);
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
          setError(
            "Nu există momentan profesori disponibili pentru coordonare."
          );
          return;
        }

        setProfessors(data);
        setError(null);
      } catch (err) {
        setError(
          "Nu s-au putut încărca profesorii. Vă rugăm încercați mai târziu."
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadProf();
  }, []);

  async function handleIsSent() {
    setIsSent(true);
    try {
      const thesisId = sessionStorage.getItem("thesisId");
      const obj = {
        id_prof: selectedProfesor.id,
        stare: "In evaluare",
      };
      const response = await fetch(
        `http://localhost:3001/api/thesis/setThesisProf/${thesisId}`,
        {
          method: "PATCH", // schimbat în PATCH
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Network response is not ok!");
      }
    } catch (err) {
      console.log("Error updating professor:", err);
      throw err;
    }
  }

  function handleRespingereColaborare() {
    setIsSent(false);
    setSelectedProfesor(null); // schimbat din ""
    setIsRespins(false);
  }

  function handleIntoarceLaAles() {
    setIsSent(false);
    setSelectedProfesor(null); // schimbat din ""
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
            if (selectedProfesor !== null) handleIsSent();
          }}
          className="profesorContainer"
        >
          <div className="profesorGroup">
            <label htmlFor="profesor">
              Alegeti profesorul coordonator dorit:
            </label>
            <select
              id="profesor"
              value={selectedProfesor ? selectedProfesor.id : ""}
              onChange={(e) => {
                const selected = professors.find(
                  (prof) => prof.id.toString() === e.target.value
                );
                setSelectedProfesor(selected);
              }}
              required
            >
              <option value="">Selecteaza</option>
              {professors.map((prof) => (
                <option key={prof.id} value={prof.id}>
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
              {selectedProfesor.nume_complet} a fost instiintat. Se asteapta un
              raspuns.
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
              lucrarea de licenta. Va trebui sa incerci din nou alaturi de un
              alt profesor.
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
