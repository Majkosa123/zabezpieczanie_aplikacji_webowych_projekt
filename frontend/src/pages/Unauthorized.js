import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h1>Brak dostępu</h1>
      <p>Nie masz uprawnień do wyświetlenia tej strony.</p>
      <Link to="/dashboard">Wróć do panelu użytkownika</Link>
    </div>
  );
};

export default Unauthorized;
