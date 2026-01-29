export function renderHome(container) {
  const token = sessionStorage.getItem("auth_token");

  if (!token) {
    window.location.href = "/";
    return;
  }
  container.innerHTML = `<!-- 🔝 NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="#">APS</a>

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
            <li class="nav-item">
              <a class="nav-link active" href="#">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Presupuestos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Stock</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Clientes</a>
            </li>
          </ul>

          <button id="logoutBtn" class="btn btn-outline-light btn-sm">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>

    <!-- 🧭 CONTENIDO -->
    <main class="container py-5">
      <div class="mb-4 text-center text-white">
        <h2 class="fw-bold">Panel principal</h2>
        <p class="opacity-75">Seleccione una acción para comenzar</p>
      </div>

      <div class="row g-4">
        <!-- PRESUPUESTOS -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm card-action">
            <div class="card-body text-center">
              <div class="mb-3">
                <i class="bi bi-file-earmark-text fs-1 text-dark"></i>
              </div>
              <h5 class="card-title">Presupuestos</h5>
              <p class="card-text text-muted">
                Crear y administrar presupuestos
              </p>
              <button class="btn btn-aps w-100 mb-2">
                Generar Presupuesto
              </button>
              <button class="btn btn-aps w-100">Gestionar Presupuestos</button>
            </div>
          </div>
        </div>

        <!-- STOCK -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm card-action">
            <div class="card-body text-center">
              <div class="mb-3">
                <i class="bi bi-box-seam fs-1 text-dark"></i>
              </div>
              <h5 class="card-title">Stock</h5>
              <p class="card-text text-muted">Gestión de productos</p>
              <button class="btn btn-aps w-100">Administrar Stock</button>
            </div>
          </div>
        </div>

        <!-- CLIENTES -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm card-action">
            <div class="card-body text-center">
              <div class="mb-3">
                <i class="bi bi-people fs-1 text-dark"></i>
              </div>
              <h5 class="card-title">Clientes</h5>
              <p class="card-text text-muted">Alta y gestión de clientes</p>
              <button class="btn btn-aps w-100">Ver Clientes</button>
            </div>
          </div>
        </div>
      </div>
    </main>`;

  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("auth_token");
    window.location.href = "/";
  });
}
