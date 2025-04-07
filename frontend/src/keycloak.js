import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:8080",
  realm: "bezpieczenstwo_projekt_realm",
  clientId: "frontend-app",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
