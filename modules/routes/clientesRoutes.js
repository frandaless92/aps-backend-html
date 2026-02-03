const { Router } = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const clientesRoutes = Router();
const path = require("path");

const FRONTEND_DIST = path.join(__dirname, "./../../frontend/dist");

clientesRoutes.get(/^\/clientes\/.*/, authMiddleware, (req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, "index.html"));
});

module.exports = { clientesRoutes };
