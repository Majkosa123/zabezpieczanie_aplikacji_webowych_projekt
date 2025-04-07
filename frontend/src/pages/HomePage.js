import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const HomePage = () => {
  const { authenticated, login } = useContext(AuthContext);

  return (
    <div>
      <h1>Strona główna</h1>
      <p>Witaj w aplikacji zabezpieczonej OAuth 2.0!</p>

      {!authenticated ? (
        <button onClick={login}>Zaloguj się</button>
      ) : (
        <p>
          Jesteś zalogowany! Przejdź do{" "}
          <a href="/dashboard">panelu użytkownika</a>.
        </p>
      )}
    </div>
  );
};

export default HomePage;
