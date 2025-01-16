function StatusComponent({ stepProp }) {
  return (
    <div className="statusContainer">
      <div className={stepProp >= 0 ? "statusActive" : ""}>
        Completare profil
      </div>
      <i
        className={`bi bi-arrow-right-circle ${
          stepProp >= 1 ? "arrowActive" : "arrowInactive"
        }`}
      ></i>
      <div className={stepProp >= 1 ? "statusActive" : ""}>
        Solicita colaborare
      </div>
      <i
        className={`bi bi-arrow-right-circle ${
          stepProp >= 2 ? "arrowActive" : "arrowInactive"
        }`}
      ></i>
      <div className={stepProp >= 2 ? "statusActive" : ""}>Trimite cerere</div>
      <i
        className={`bi bi-arrow-right-circle ${
          stepProp >= 3 ? "arrowActive" : "arrowInactive"
        }`}
      ></i>
      <div className={stepProp >= 3 ? "statusActive" : ""}>Raspuns cerere</div>
    </div>
  );
}

export default StatusComponent;
