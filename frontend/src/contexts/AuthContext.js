import React, { createContext, useState, useEffect } from "react";
import keycloak from "../keycloak";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [keycloakInstance, setKeycloakInstance] = useState(null);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri:
            window.location.origin + "/silent-check-sso.html",
          pkceMethod: "S256",
        });

        setAuthenticated(authenticated);
        setKeycloakInstance(keycloak);

        if (authenticated) {
          setUser({
            username: keycloak.tokenParsed.preferred_username,
            roles: keycloak.realmAccess?.roles || [],
            token: keycloak.token,
          });
        }
      } catch (error) {
        console.error("Failed to initialize Keycloak:", error);
      } finally {
        setLoading(false);
      }
    };

    initKeycloak();
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  const isAdmin = () => {
    return user?.roles.includes("admin") || false;
  };

  const value = {
    authenticated,
    user,
    keycloak: keycloakInstance,
    login,
    logout,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
