const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.get("/user", verifyToken, (req, res) => {
  res.json({
    message: "Dane użytkownika dostępne",
    username: req.user.preferred_username,
    email: req.user.email,
    roles: req.roles,
    data: {
      accessLevel: "basic",
      lastLogin: new Date().toISOString(),
      features: ["profile", "messages", "settings"],
    },
  });
});

router.get("/admin", verifyToken, verifyAdmin, (req, res) => {
  res.json({
    message: "Dane administratora dostępne",
    username: req.user.preferred_username,
    email: req.user.email,
    roles: req.roles,
    data: {
      accessLevel: "admin",
      lastLogin: new Date().toISOString(),
      features: [
        "profile",
        "messages",
        "settings",
        "user-management",
        "system-settings",
        "logs",
      ],
      statistics: {
        activeUsers: 42,
        newRegistrations: 7,
        totalUsers: 128,
      },
    },
  });
});

module.exports = router;
