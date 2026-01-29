require("dotenv").config();
const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const {
  authMiddleware,
  generarToken,
} = require("./middlewares/authMiddleware");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3020;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================================
   FRONTEND BUILD
================================ */
const FRONTEND_DIST = path.join(__dirname, "frontend", "dist");
app.use(express.static(FRONTEND_DIST));

/* ================================
   LOGIN
================================ */

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Datos incompletos",
    });
  }

  if (username !== process.env.APP_USER) {
    return res.status(401).json({
      success: false,
      message: "Credenciales inválidas",
    });
  }

  const valid = await bcrypt.compare(password, process.env.APP_PASS_HASH);

  if (!valid) {
    return res.status(401).json({
      success: false,
      message: "Credenciales inválidas",
    });
  }

  const token = generarToken(username);
  return res
    .cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true, // true si usás https
    })
    .json({
      success: true,
      message: "Login OK",
    });
});

app.get("/home", authMiddleware, (req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, "index.html"));
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
