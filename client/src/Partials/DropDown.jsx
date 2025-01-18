import React from "react";
import "../Styles/DropDown.css";
import { Link } from "react-router-dom";

export default function DropDown() {
  return (
    <div className="hamburger-container">
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="hamburger-button">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <nav className="side-menu">
        <ul>
          <li>
            <Link to="/profilProfesor" className="text-left text-dark mb-2">
              Profil
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-left text-dark mb-2">
              Vizualizare cereri
            </Link>
          </li>
          <li>
            <Link to="/aplicanti-acceptati" className="text-left text-dark mb-2">
              Aplicanti acceptati
            </Link>
          </li>
          <li>
          <Link to="/help-professor" className="text-left text-dark mb-2">
              Ajutor
            </Link>
          </li>
          <li>
          <Link to="#" className="text-left text-dark mb-2">
              Iesi din cont
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
