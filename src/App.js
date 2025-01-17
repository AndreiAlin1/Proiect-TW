import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/DashBoard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar";
import { useState } from "react";
import FormCompletare from "./Components/FormCompletare";
import "./Styles/FormCompletareCSS.css";
import "./Styles/Status.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Pentru iconițe
import AlegeProfesor from "./Components/AlegeProfesor";
import "./Styles/AlegeProfesor.css";
import AcceptareColaborare from "./Components/AcceptareColaborare";
import "./Styles/AcceptareColaborare.css";
import RaspunsCerere from "./Components/RaspunsCerere";
import "./Styles/RaspunsCerere.css";
import LoginScreen from "./Components/LoginScreen";
import "./Styles/LoginScreen.css";
import "./Pages/DashBoard.jsx";
import "./Pages/ApprovedApplicants.jsx";
import ApprovedApplicants from "./Pages/ApprovedApplicants.jsx";
import DropDownElev from "./Partials/DropDownElev.jsx";
import ProfilStudent from "./Pages/ProfilStudent.jsx";
import HelpStudent from "./Pages/HelpStudent.jsx";
import ProfilProfesor from "./Pages/ProfilProfesor.jsx";

function App() {
  //State uri pentru NavBar pentru a stii la ce pas suntem in trimiterea cererii ca elev
  const [step, setStep] = useState(0);

  //State uri pentru componenta de Loggin
  const [loggedIn, setLoggedIn] = useState(false);

  //State uri pentru datele elevului
  const [specializare, setSpecializare] = useState("");
  const [serie, setSerie] = useState("");
  const [grupa, setGrupa] = useState("");
  const [titluLucrare, setTitluLucrare] = useState("");

  //State-uri pentru datele profesorului
  const [numarElevi, setNumarElevi] = useState(0);
  const [intervalStart, setIntervalStart] = useState(null); // Le vom folosi ca obiecte de tip Date
  const [intervalEnd, setIntervalEnd] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Specializare:", specializare);
    console.log("Serie:", serie);
    console.log("Grupa:", grupa);
    setNumarElevi((nr) => nr + 0); // N ARE SENS E PUS AICI CA SA NU MAI AM WARNING IN ES LINT CA setNumarElevi nu este folosit. VA FI STERS !!
  };

  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  }
  function handlePrev() {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }
  function handleTrimiteDinNou() {
    setStep((s) => 2);
  }
  function handleLoggingIn() {
    console.log("Am intrat pe aicea.");
    setLoggedIn(true);
  }
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aplicanti-acceptati" element={<ApprovedApplicants />} />
        <Route path="/help-student" element={<HelpStudent />} />
        <Route
          path="/profilElev"
          element={
            <ProfilStudent
              onSubmit={handleSubmit}
              specializare={specializare}
              setSpecializare={setSpecializare}
              serie={serie}
              setSerie={setSerie}
              grupa={grupa}
              setGrupa={setGrupa}
            />
          }
        />
        <Route
          path="/profilProfesor"
          element={
            <ProfilProfesor
              numarElevi={numarElevi}
              intervalStart={intervalStart}
              setIntervalStart={setIntervalStart}
              intervalEnd={intervalEnd}
              setIntervalEnd={setIntervalEnd}
            />
          }
        />
        <Route
          path="/"
          element={
            loggedIn === true ? (
              <>
                <DropDownElev></DropDownElev>
                <NavBar stepProp={step} />
                {step === 0 ? (
                  <FormCompletare
                    onSubmit={handleSubmit}
                    specializare={specializare}
                    setSpecializare={setSpecializare}
                    titluLucrare={titluLucrare}
                    setTitluLucrare={setTitluLucrare}
                    serie={serie}
                    setSerie={setSerie}
                    grupa={grupa}
                    setGrupa={setGrupa}
                  />
                ) : (
                  false
                )}
                {step === 1 ? <AlegeProfesor /> : false}
                {step === 2 ? (
                  <AcceptareColaborare></AcceptareColaborare>
                ) : (
                  false
                )}
                {step === 3 ? (
                  <RaspunsCerere
                    onTrimiteDinNou={handleTrimiteDinNou}
                  ></RaspunsCerere>
                ) : (
                  false
                )}
                <div className="butoane">
                  <button onClick={handleNext}>Next</button>
                  <button onClick={handlePrev}>Previous</button>
                </div>
              </>
            ) : (
              <LoginScreen onLoggingIn={handleLoggingIn}></LoginScreen>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
