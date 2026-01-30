export function renderNavbar(container) {
  if (!container) {
    throw new Error("renderNavbar: container es null");
  }

  container.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="/home">APS</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#apsNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="apsNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Presupuestos
              </a>

              <ul class="dropdown-menu shadow bg-dark">
                <li>
                  <a class="dropdown-item text-white" href="/presupuestos/generate-budget">
                    Generar
                  </a>
                </li>
                <li>
                  <a class="dropdown-item text-white" href="/presupuestos/manage-budgets">
                    Gestionar
                  </a>
                </li>
              </ul>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/stock/manage-stock">Stock</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/clientes/manage-clients">Clientes</a>
            </li>
          </ul>

          <button id="logoutBtn" class="btn btn-outline-light btn-sm">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  `;

  /* 🔐 Logout */
  const logoutBtn = container.querySelector("#logoutBtn");
  logoutBtn.addEventListener("click", async () => {
    await fetch("/auth/logout", { method: "POST" });
    window.location.href = "/";
  });

  /* 📍 Marcar activo */
  const currentPath = window.location.pathname;

  container.querySelectorAll(".nav-link, .dropdown-item").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");

      // si está dentro del dropdown, marcar el padre
      const dropdown = link.closest(".dropdown");
      if (dropdown) {
        dropdown.querySelector(".nav-link").classList.add("active");
      }
    }
  });
}
