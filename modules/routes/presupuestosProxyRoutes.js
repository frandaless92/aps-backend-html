// routes/presupuestos.proxy.js
const { Router } = require("express");
const axios = require("axios");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = Router();

const apiExterna = axios.create({
  baseURL: "https://aps-backend-jjks.onrender.com",
  headers: {
    "x-api-key": process.env.APS_API_KEY,
  },
  timeout: 90000,
});

router.post("/api/presupuestos", authMiddleware, async (req, res) => {
  try {
    const {
      cliente,
      items,
      total,
      vendedor,
      trabajo,
      condicionPago,
      referenciaPago,
      validez,
    } = req.body;

    // 🛑 Validación mínima (proxy, no negocio)
    if (!cliente || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Datos de presupuesto incompletos",
      });
    }

    // 🔹 reenviar al backend final
    const resp = await apiExterna.post(
      "/presupuestos",
      {
        cliente,
        items,
        total,
        vendedor,
        trabajo,
        condicionPago,
        referenciaPago,
        validez,
      },
      {
        responseType: "arraybuffer", // 🔥 CLAVE
      },
    );

    // 🔹 propagar headers importantes
    res.setHeader("Content-Type", "application/pdf");

    if (resp.headers["content-disposition"]) {
      res.setHeader("Content-Disposition", resp.headers["content-disposition"]);
    }

    if (resp.headers["x-presupuesto-numero"]) {
      res.setHeader(
        "X-Presupuesto-Numero",
        resp.headers["x-presupuesto-numero"],
      );
    }

    return res.end(resp.data);
  } catch (error) {
    console.error(
      "❌ Proxy generar presupuesto:",
      error.response?.data || error.message,
    );

    return res.status(500).json({
      error: "Error generando el presupuesto",
    });
  }
});

module.exports = { presupuestosProxyRoutes: router };
