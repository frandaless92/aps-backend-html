import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./src/style.css";

import { renderLogin } from "./src/pages/login.page";
import { renderHome } from "./src/pages/home.page";

const app = document.getElementById("app");

/* ================================
   ROUTER SIMPLE POR URL
================================ */
function router() {
  const path = window.location.pathname;

  app.innerHTML = "";

  if (path === "/home") {
    renderHome(app);
  } else {
    renderLogin(app);
  }
}

window.addEventListener("DOMContentLoaded", router);
