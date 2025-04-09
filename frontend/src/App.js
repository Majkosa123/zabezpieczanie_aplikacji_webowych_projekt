import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const SilentCheckSso = () => <div>Loading...</div>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Strona główna</Link>
              </li>
              <li>
                <Link to="/dashboard">Panel użytkownika</Link>
              </li>
              <li>
                <Link to="/admin">Panel administratora</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/dashboard"
              element={<PrivateRoute element={<UserDashboard />} />}
            />

            <Route
              path="/admin"
              element={
                <PrivateRoute
                  element={<AdminDashboard />}
                  requiredRoles={["admin"]}
                />
              }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/silent-check-sso.html" element={<SilentCheckSso />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
