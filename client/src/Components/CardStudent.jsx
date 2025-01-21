import React from "react";
import "../Styles/CardStudent.css";
import DownloadThesis from "./DownloadThesis";

//aici trebuiet sa preluam din bd pentru fiecare id corespunzator lista cu cei care vor sa aplice , care au statusul de pending
export default function Card({ studentId, name, specializare, serie, grupa }) {
  return (
    <div className="card">
      <div className="card-bodyStudent ">
        <h5 className="card-name">{name}</h5>
        <p className="card-text">{name}</p>
        <p className="card-text">{serie}</p>
        <p className="card-text">{grupa}</p>
        <button className="descarca-cererea">Descarca cererea</button>
      </div>
      <div className="buttons">
        <DownloadThesis studentId={studentId}></DownloadThesis>
      </div>
    </div>
  );
}
