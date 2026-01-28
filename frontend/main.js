import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./src/style.css";

import { initLogin } from "./src/pages/login.page";
import { initHome } from "./src/pages/home.page";

const page = document.body.dataset.page;

const pageInitializers = {
  login: initLogin,
  home: initHome,
};

pageInitializers[page]?.();
