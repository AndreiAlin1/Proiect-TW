import React from "react";
import "../Styles/CardStudent.css";

export default function Card({ name, specializare, serie, grupa }) {
  return (
    <div className="card">
      <div className="card-bodyStudent ">
        <h5 className="card-name">{name}</h5>
        <p className="card-text">{specializare}</p>
        <p className="card-text">{serie}</p>
        <p className="card-text">{grupa}</p>
        <button className="descarca-cererea">Descarca cererea</button>
      </div>
    </div>
  );
}
