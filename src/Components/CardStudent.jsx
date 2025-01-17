import React from "react";
import "../Styles/CardStudent.css";

//aici trebuiet sa preluam din bd pentru fiecare id corespunzator lista cu cei care vor sa aplice , care au statusul de pending
export default function Card({ name, specializare, serie, grupa }) {
    return (
        <div className="card">
            <div className="card-bodyStudent">
                <h5 className="card-name">{name}</h5>
                <p className="card-text">{specializare}</p>
                <p className="card-text">{serie}</p>
                <p className="card-text">{grupa}</p>
            </div>
        </div>
    );
}