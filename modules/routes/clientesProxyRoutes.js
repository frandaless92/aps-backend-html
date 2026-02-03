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

router.post("/api/clientes", async (req, res) => {
  try {
    // 🔥 CLAVE: desarmar el wrapper "data"
    const payload = req.body.data ?? req.body;

    const resp = await apiExterna.post("/clientes", payload);

    return res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error(
      "❌ Error proxy POST /clientes:",
      err.response?.data || err.message,
    );

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        error: "Error comunicando con backend clientes",
      },
    );
  }
});

router.put("/api/clientes/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body.data ?? req.body;

    const resp = await apiExterna.put(`/clientes/${id}`, payload);

    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error(
      "❌ Error proxy PUT /clientes:",
      err.response?.data || err.message,
    );
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "Error actualizando cliente" });
  }
});

router.delete("/api/clientes/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const resp = await apiExterna.delete(`/clientes/${id}`);

    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error(
      "❌ Error proxy DELETE /clientes:",
      err.response?.data || err.message,
    );
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "Error eliminando cliente" });
  }
});

module.exports = { clientesProxyRoutes: router };
