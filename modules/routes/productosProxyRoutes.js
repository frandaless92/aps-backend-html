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
  timeout: 20000,
});

/* =====================================================
   📥 GET productos (CONSERVAMOS TU LÓGICA)
===================================================== */
router.get("/api/productos", authMiddleware, async (req, res) => {
  try {
    const { tipoPrecio = "contado", categoria } = req.query;

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
      descripcion: p.descripcion ?? null,
      cal: p.cal ?? null,
      pul: p.pul ?? null,
      alt: p.alt ?? null,
      long: p.long ?? null,
      stock: p.stock,
      categoria: p.categoria,
      precio: tipoPrecio === "lista" ? p.precio_lista : p.precio,
      precio_lista: p.precio_lista,
    }));

    res.json(productos);
  } catch (err) {
    console.error("❌ Proxy GET productos:", err.message);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
});

/* =====================================================
   ➕ POST crear producto
===================================================== */
router.post("/api/productos", authMiddleware, async (req, res) => {
  try {
    const resp = await apiExterna.post("/productos", req.body);
    res.json(resp.data);
  } catch (err) {
    console.error("❌ Proxy POST producto:", err.message);
    res.status(500).json({ error: "Error creando producto" });
  }
});

/* =====================================================
   ✏️ PUT actualizar producto
===================================================== */
router.put("/api/productos/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await apiExterna.put(`/productos/${id}`, req.body);
    res.json(resp.data);
  } catch (err) {
    console.error("❌ Proxy PUT producto:", err.message);
    res.status(500).json({ error: "Error actualizando producto" });
  }
});

/* =====================================================
   ❌ DELETE eliminar producto
   👉 categoría via query (?tipo=ACCESORIOS|TEJIDOS)
===================================================== */
router.delete("/api/productos/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await apiExterna.delete(`/productos/${id}`, {
      params: req.query,
    });
    res.json(resp.data);
  } catch (err) {
    console.error("❌ Proxy DELETE producto:", err.message);
    res.status(500).json({ error: "Error eliminando producto" });
  }
});

/* =====================================================
   🔄 POST update stock
===================================================== */
router.post("/api/productos/update-stock", authMiddleware, async (req, res) => {
  try {
    const resp = await apiExterna.post("/productos/update-stock", req.body);
    res.json(resp.data);
  } catch (err) {
    console.error("❌ Proxy update-stock:", err.message);
    res.status(500).json({ error: "Error actualizando stock" });
  }
});

module.exports = { productosProxyRoutes: router };
