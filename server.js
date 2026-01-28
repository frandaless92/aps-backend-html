require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3020;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================================
   FRONTEND BUILD
================================ */
const FRONTEND_DIST = path.join(__dirname, "frontend", "dist");
app.use(express.static(FRONTEND_DIST));

/* ================================
   LOGIN
================================ */
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Datos incompletos",
    });
  }

  if (username === process.env.APP_USER && password === process.env.APP_PASS) {
    return res.json({
      success: true,
      message: "Login OK",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Credenciales inválidas",
  });
});

/* ================================
   SPA FALLBACK (FIX MIME)
================================ */
app.get(/^\/(?!assets|auth).*/, (req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Web server activo en puerto ${PORT}`);
});
