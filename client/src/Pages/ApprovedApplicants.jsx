import React from "react";
import DropDown from "../Partials/DropDown";
import CardStudent from "../Components/CardStudent";

//trb facut sa ia din bd fiecare aplicant specific unui id al unui profesor
export default function ApprovedApplicants({ onLogout }) {
  return (
    <div>
      <h1>Approved Applicants</h1>
      <DropDown onLogout={onLogout} />
      <CardStudent
        name="Andrei George-Alin"
        specializare="Informatica"
        serie="C"
        grupa="1087"
      />
    </div>
  );
}
