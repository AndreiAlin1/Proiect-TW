import { Link } from "react-router-dom";
import React from "react";
import "../Styles/DropDownElev.css";

function DropDownElev() {
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
            <Link to="/profilElev" className="text-left text-dark mb-2">
              Profil
            </Link>
          </li>
          <li>
            <Link to="/" className="text-left text-dark mb-2">
              Cerere
            </Link>
          </li>
          <li>
            <Link to="/ajutorElev" className="text-left text-dark mb-2">
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

export default DropDownElev;
