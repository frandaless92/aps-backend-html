const { Router } = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const stockRoutes = Router();
const path = require("path");

const FRONTEND_DIST = path.join(__dirname, "./../../frontend/dist");

stockRoutes.get(/^\/stock\/.*/, authMiddleware, (req, res) => {
  res.sendFile(path.join(FRONTEND_DIST, "index.html"));
});

module.exports = { stockRoutes };
