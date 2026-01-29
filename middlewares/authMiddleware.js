const crypto = require("crypto");
/* ================================
   GENERAR TOKEN VÁLIDO
================================ */
function generarToken(username) {
  return crypto
    .createHmac("sha256", process.env.APP_TOKEN_SECRET)
    .update(username)
    .digest("hex");
}

/* ================================
   AUTH MIDDLEWARE
================================ */
function authMiddleware(req, res, next) {
  const token =
    req.cookies?.auth_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token requerido",
    });
  }

  const tokenValido = generarToken(process.env.APP_USER);

  if (token !== tokenValido) {
    return res.status(401).json({
      success: false,
      message: "Token inválido",
    });
  }

  next();
}

module.exports = { authMiddleware, generarToken };
