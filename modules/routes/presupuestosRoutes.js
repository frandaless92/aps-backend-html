const { Router } = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const presupuestosRoutes = Router();
const path = require("path");

const FRONTEND_DIST = path.join(__dirname, "./../../frontend/dist");

presupuestosRoutes.get(/^\/presupuestos\/.*/, authMiddleware, (req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, "index.html"));
});

module.exports = { presupuestosRoutes };
