const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

// konfiguracja klienta JWKS do pobierania kluczy publicznych z Keycloak
const client = jwksClient({
  jwksUri: `${process.env.KEYCLOAK_URL || "http://localhost:8080"}/realms/${
    process.env.KEYCLOAK_REALM || "bezpieczenstwo_projekt_realm"
  }/protocol/openid-connect/certs`,
  cache: true,
  rateLimit: true,
});

// funkcja do pobierania kluczy publicznych
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

// middleware do weryfikacji tokenów
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Brak tokenu autoryzacyjnego" });
  }

  const token = authHeader.split(" ")[1];

  // weryfikacja tokenu
  jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Nieprawidłowy token", error: err.message });
    }

    req.user = decoded;
    req.roles = decoded.realm_access?.roles || [];
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (!req.roles || !req.roles.includes("admin")) {
    return res.status(403).json({ message: "Brak uprawnień administratora" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
