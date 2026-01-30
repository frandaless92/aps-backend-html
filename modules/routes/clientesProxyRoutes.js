const { Router } = require("express");
const axios = require("axios");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = Router();

const apiExterna = axios.create({
  baseURL: "https://aps-backend-jjks.onrender.com",
  headers: {
    "x-api-key": process.env.APS_API_KEY,
  },
});

router.get("/api/clientes", authMiddleware, async (req, res) => {
  try {
    const resp = await apiExterna.get("/clientes");
    res.json(resp.data);
  } catch (err) {
    console.error("Error proxy clientes:", err.message);
    res.status(500).json({ error: "No se pudieron obtener los clientes" });
  }
});

module.exports = { clientesProxyRoutes: router };
