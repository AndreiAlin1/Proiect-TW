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
                    <li><Link to="/">Profil</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="#">Ajutor</Link></li>
                    <li><Link to="#">Iesi din cont</Link></li>
                </ul>
            </nav>
        </div>
    );
}