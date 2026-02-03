require("dotenv").config();
const express = require("express");
const path = require("path");
const { authMiddleware } = require("./middlewares/authMiddleware");
const cookieParser = require("cookie-parser");
const { authRoutes } = require("./modules/routes/authRoutes");
const { presupuestosRoutes } = require("./modules/routes/presupuestosRoutes");
const { stockRoutes } = require("./modules/routes/stockRoutes");
const { clientesRoutes } = require("./modules/routes/clientesRoutes");
const { clientesProxyRoutes } = require("./modules/routes/clientesProxyRoutes");
const {
  productosProxyRoutes,
} = require("./modules/routes/productosProxyRoutes");
const {
  presupuestosProxyRoutes,
} = require("./modules/routes/presupuestosProxyRoutes");

const app = express();
const PORT = process.env.PORT || 3020;
const FRONTEND_DIST = path.join(__dirname, "frontend", "dist");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================================
   FRONTEND BUILD
================================ */

app.use(express.static(FRONTEND_DIST));

/* ================================
   AUTH ROUTES
================================ */
app.use("/", authRoutes);
app.use("/", presupuestosRoutes);
app.use("/", clientesRoutes);
app.use("/", clientesProxyRoutes);
app.use("/", productosProxyRoutes);
app.use("/", presupuestosProxyRoutes);
app.use("/", stockRoutes);

/* ================================
   PROTECTED ROUTES
================================ */

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
