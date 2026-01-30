// routes/productos.proxy.js
const { Router } = require("express");
const axios = require("axios");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = Router();

const apiExterna = axios.create({
  baseURL: "https://aps-backend-jjks.onrender.com",
  headers: {
    "x-api-key": process.env.APS_API_KEY,
  },
  timeout: 10000,
});

router.get("/api/productos", authMiddleware, async (req, res) => {
  try {
    const { tipoPrecio = "contado", categoria } = req.query;

    // 🔹 llamada al backend real
    const resp = await apiExterna.get("/productos");

    let productos = resp.data;

    // 🔹 filtro por categoría
    if (categoria) {
      productos = productos.filter(
        (p) => p.categoria.toLowerCase() === categoria.toLowerCase(),
      );
    }

    // 🔹 mapear precio según tipo
    productos = productos.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      stock: p.stock,
      categoria: p.categoria,
      precio: tipoPrecio === "lista" ? p.precio_lista : p.precio,
    }));

    res.json(productos);
  } catch (err) {
    console.error("❌ Proxy productos:", err.message);

    res.status(500).json({
      error: "Error obteniendo productos",
    });
  }
});

module.exports = { productosProxyRoutes: router };
