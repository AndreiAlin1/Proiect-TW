import React from "react";
import "../Styles/Card.css";

//aici trebuiet sa preluam din bd pentru fiecare id corespunzator lista cu cei care vor sa aplice , care au statusul de pending
export default function Card({ studentName, thesisTitle }) {
  function handleAcceptareCerere() {
    console.log("MERGE FRATE");
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-name">{studentName}</h5>
        <p className="card-text">
          Doreste sa faca parte din echipa dvs. de Disertatie
        </p>
        <p className="card-thesis-title">
          Titlu lucrare de licenta: {thesisTitle}
        </p>
      </div>
      <div className="buttons">
        <button className="confirm" onClick={handleAcceptareCerere}>
          Accepta
        </button>
        <button className="reject">Refuza</button>
      </div>
    </div>
  );
}
