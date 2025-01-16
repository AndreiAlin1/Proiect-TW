import React, { useState } from "react";

function LoginScreen({ onLoggingIn }) {
  const [role, setRole] = useState("ELEV");

  const handleLogin = () => {
    alert(`Autentificare simulată ca ${role}!`);
    // Aici vei adăuga logica pentru autentificarea reală
    onLoggingIn();
  };

  return (
    <div className="loginContainer">
      <h1 className="text-center text-light mb-4">
        Inscriere sustinere licenta
      </h1>
      <div className="text-center">
        <i
          className="bi bi-mortarboard text-light"
          style={{ fontSize: "2rem" }}
        ></i>
      </div>
      <p className="text-center text-light mb-3 loginTitle">
        Autentifică-te cu contul tău instituțional.
      </p>
      <div className="text-center mb-4">
        <p className="text-light">Te loghezi ca:</p>
        <div className="roleSwitch">
          <span
            className={`roleOption ${
              role === "ELEV" ? "activeOption" : "inactiveOption"
            }`}
            onClick={() => setRole("ELEV")}
          >
            ELEV
          </span>
          <span
            className={`roleOption ${
              role === "STUDENT" ? "activeOption" : "inactiveOption"
            }`}
            onClick={() => setRole("STUDENT")}
          >
            STUDENT
          </span>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <button className="googleButton" onClick={handleLogin}>
          <i className="bi bi-google me-2"></i> Autentificare cu Google
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
