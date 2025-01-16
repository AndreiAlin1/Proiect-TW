import React from "react";
import Card from "../Components/Card";
import DropDown from "../Partials/DropDown";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <DropDown/>
      <h1>Welcome to the Dashboard</h1>
      <Card name="Card Title"/>
    </div>
  );
}

