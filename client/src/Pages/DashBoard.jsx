import React from "react";
import Card from "../Components/Card";
import DropDown from "../Partials/DropDown";

export default function Dashboard() {
  var array = ["Andrei George-Alin", "Avram Alin Ioan", "Boian Eduard"];
  return (
    <div className="dashboard">
      <DropDown />
      <h1>Welcome to the Dashboard</h1>
      {array.map((name, index) => (
        <Card key={index} name={name} />
      ))}
    </div>
  );
}