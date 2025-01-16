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
function App() {
  const [step, setStep] = useState(0);
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
  return (
    <>
      <NavBar stepProp={step}></NavBar>
      {step === 0 ? <FormCompletare></FormCompletare> : false}
      {step === 1 ? <AlegeProfesor></AlegeProfesor> : false}
      {step === 2 ? <AcceptareColaborare></AcceptareColaborare> : false}
      <div className="butoane">
        <button onClick={handleNext}>Next</button>
        <button onClick={handlePrev}>Previous</button>
      </div>
    </>
  );
}

export default App;
