import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/admin", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setAdminData(response.data);
      } catch (err) {
        setError("Błąd podczas pobierania danych administratora");
        console.error(err);
      }
    };

    if (user) {
      fetchAdminData();
    }
  }, [user]);

  return (
    <div>
      <h1>Panel administratora</h1>
      <p>Witaj, {user?.username}! Jesteś zalogowany jako administrator.</p>

      {adminData ? (
        <div>
          <h2>Dane administratora:</h2>
          <pre>{JSON.stringify(adminData, null, 2)}</pre>
        </div>
      ) : error ? (
        <p>Błąd: {error}</p>
      ) : (
        <p>Ładowanie danych administratora...</p>
      )}

      <button onClick={logout}>Wyloguj się</button>
    </div>
  );
};

export default AdminDashboard;
