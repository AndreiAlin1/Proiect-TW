import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/DashBoard';
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

function App() {
  const [step, setStep] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
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
        <Route
          path="/"
          element={
            <>
              <NavBar stepProp={step} />
              {step === 0 ? <FormCompletare /> : false}
              {step === 1 ? <AlegeProfesor /> : false}
              {step === 2 ? <AcceptareColaborare></AcceptareColaborare> : false}
              {step === 3 ? <RaspunsCerere></RaspunsCerere> : false}
              <div className="butoane">
                <button onClick={handleNext}>Next</button>
                <button onClick={handlePrev}>Previous</button>
              </div>
            </>
          }
        />
      </Routes >
    </Router>
  );
}

export default App;