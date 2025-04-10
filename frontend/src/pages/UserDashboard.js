import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/user", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError("Błąd podczas pobierania danych");
        console.error(err);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div>
      <h1>Panel użytkownika</h1>
      <p>Witaj, {user?.username}!</p>

      {userData ? (
        <div>
          <h2>Twoje dane:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : error ? (
        <p>Błąd: {error}</p>
      ) : (
        <p>Ładowanie danych...</p>
      )}

      <button onClick={logout}>Wyloguj się</button>
    </div>
  );
};

export default UserDashboard;
