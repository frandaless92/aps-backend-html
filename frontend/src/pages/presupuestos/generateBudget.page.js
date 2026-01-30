// src/pages/presupuestos/generateBudget.page.js
import * as bootstrap from "bootstrap";
import { animateFadeUp } from "../../utils/animate";

export function renderGenerateBudget(container) {
  container.innerHTML = `
    <main class="container-fluid py-5">
      <div class="row g-4">

        <!-- =========================
            COLUMNA IZQUIERDA
        ========================== -->
        <div class="col-12 col-lg-4">

          <!-- CLIENTE -->
          <div class="card mb-4 shadow-sm fade-up">
            <div class="card-body">
              <small class="text-muted">Cliente</small>
              <h5 class="fw-bold mt-1" id="clienteSeleccionado">
                Seleccionar cliente
              </h5>
              <h6 class="fw-bold mt-1" id="clienteInfo1">
              </h6>
              <h6 class="fw-bold mt-1" id="clienteInfo2">
              </h6>

              <button id="btnCambiarCliente" class="btn btn-outline-primary btn-sm mt-3 w-100">
                Cambiar cliente
              </button>
            </div>
          </div>

          <!-- DATOS DEL PRESUPUESTO -->
          <div class="card shadow-sm fade-up">
            <div class="card-body">
              <h6 class="fw-bold mb-3">Datos del presupuesto</h6>

              <!-- CONDICIÓN DE PAGO -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Condición de pago</label>
                <div class="btn-group w-100" id="condicionPagoGroup">
                  <button class="btn btn-outline-primary active" data-value="Contado">Contado</button>
                  <button class="btn btn-outline-primary" data-value="Débito">Débito</button>
                  <button class="btn btn-outline-primary" data-value="Crédito">Crédito</button>
                </div>
              </div>

              <!-- MANO DE OBRA -->
              <div class="mb-3">
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="chkManoObra">
                  <label class="form-check-label fw-semibold">
                    Incluir mano de obra
                  </label>
                </div>

                <input
                  id="inputManoObra"
                  type="number"
                  class="form-control d-none"
                  placeholder="Importe de mano de obra"
                />
              </div>

              <!-- TRABAJO -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Trabajo</label>
                <input id="inputTrabajo" class="form-control" placeholder="Nombre de quien trabajó" />
              </div>

              <!-- VENDEDOR -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Vendedor</label>
                <input id="inputVendedor" class="form-control" placeholder="Nombre del vendedor" />
              </div>

              <!-- VALIDEZ -->
              <div>
                <label class="form-label fw-semibold">Validez</label>
                <input id="inputValidez" type="date" class="form-control" />
              </div>
            </div>
          </div>
        </div>

        <!-- =========================
            COLUMNA DERECHA
        ========================== -->
        <div class="col-12 col-lg-8">

          <!-- PRODUCTOS -->
          <div class="card shadow-sm mb-4 fade-up">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold mb-0">Productos</h6>
                <button class="btn btn-primary btn-sm">
                  Agregar producto
                </button>
              </div>

              <!-- LISTA / TABLA -->
              <div class="table-responsive">
                <table class="table align-middle">
                  <thead class="table-light">
                    <tr>
                      <th>Producto</th>
                      <th class="text-center">Cant.</th>
                      <th class="text-end">Precio</th>
                      <th class="text-end">Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- RESUMEN TOTAL -->
          <div class="card shadow-sm fade-up">
            <div class="card-body">

              <div class="d-flex justify-content-between mb-2">
                <span>Subtotal productos</span>
              </div>

              <div class="d-flex justify-content-between mb-2">
                <span>Mano de obra</span>
              </div>

              <hr />

              <div class="d-flex justify-content-between align-items-center">
                <h5 class="fw-bold mb-0">TOTAL</h5>
                <h4 class="fw-bold text-success mb-0"></h4>
              </div>

              <button id="btnGenerarPresupuesto" class="btn btn-success w-100 mt-4">
                GENERAR PRESUPUESTO (PDF)
              </button>
            </div>
          </div>

        </div>
      </div>
      <!-- =========================
     MODAL CLIENTES
      ========================== -->
      <div
        class="modal fade"
        id="clientesModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title fw-bold">Seleccionar cliente</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

              <!-- BUSCADOR -->
              <input
                id="clienteSearch"
                type="text"
                class="form-control mb-3"
                placeholder="Buscar cliente por nombre o apellido..."
              />

              <!-- LISTA -->
              <div id="clientesList" class="list-group">
                <!-- clientes dinámicos -->
              </div>

            </div>

            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
            </div>

          </div>
        </div>
      </div>
    <div class="modal fade" id="productosModal" tabindex="-1">
  <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title fw-bold">Seleccionar producto</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">

        <!-- FILTROS -->
        <div class="row g-3 mb-3">

          <!-- PRECIO -->
          <div class="col-md-6">
            <label class="form-label fw-semibold">Tipo de precio</label>
            <div class="btn-group w-100" id="precioGroup">
              <button class="btn btn-outline-primary active" data-value="contado">
                Contado
              </button>
              <button class="btn btn-outline-primary" data-value="lista">
                Lista
              </button>
            </div>
          </div>

          <!-- CATEGORIA -->
          <div class="col-md-6">
            <label class="form-label fw-semibold">Categoría</label>
            <div class="btn-group w-100" id="categoriaGroup">
              <button class="btn btn-outline-secondary active" data-value="Accesorios">
                Accesorios
              </button>
              <button class="btn btn-outline-secondary" data-value="Tejidos">
                Tejidos
              </button>
            </div>
          </div>
        </div>

        <!-- LISTA -->
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th class="text-center">Stock</th>
                <th class="text-end">Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="productosList"></tbody>
          </table>
        </div>

      </div>

    </div>
  </div>
</div>

    </main>

  `;

  animateFadeUp(container);

  const presupuesto = {
    cliente: null,
    items: [],
    total: 0,

    condicionPago: "Contado",
    referenciaPago: "",

    trabajo: "",
    vendedor: "",
    validez: "",

    incluyeManoObra: false,
    manoObra: 0,
  };

  // ====== CONDICION PAGO ======
  container.querySelectorAll(".condPago").forEach((btn) => {
    btn.addEventListener("click", () => {
      condicionPago = btn.dataset.value;
    });
  });

  // ====== REFERENCIA PAGO ======
  container.querySelectorAll(".refPago").forEach((btn) => {
    btn.addEventListener("click", () => {
      referenciaPago = btn.dataset.value;
    });
  });

  // ====== GENERAR PRESUPUESTO ======
  container
    .querySelector("#btnGenerarPresupuesto")
    .addEventListener("click", async () => {
      document.getElementById("loadingOverlay").classList.remove("d-none");

      // ⚠️ acá después conectamos con backend
      setTimeout(() => {
        document.getElementById("loadingOverlay").classList.add("d-none");
        alert("Presupuesto generado (simulado)");
      }, 1500);
    });

  const clientesModal = new bootstrap.Modal(
    document.getElementById("clientesModal"),
  );

  container
    .querySelector("#btnCambiarCliente")
    .addEventListener("click", cargarClientes);

  async function cargarClientes() {
    Swal.fire({
      title: "Cargando clientes...",
      text: "Por favor espere",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const resp = await fetch("/api/clientes");
      if (!resp.ok) throw new Error("Error al cargar clientes");

      const clientes = await resp.json();
      renderClientes(clientes);

      Swal.close();
      clientesModal.show();
    } catch (err) {
      Swal.close();
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los clientes",
      });
    }
  }

  function renderClientes(clientes) {
    const list = container.querySelector("#clientesList");
    list.innerHTML = "";

    clientes.forEach((cliente) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "list-group-item list-group-item-action";

      item.innerHTML = `
      <div class="fw-bold">${cliente.apellido}, ${cliente.nombre}</div>
      <small class="text-muted">
        ${cliente.telefono || ""} ${cliente.email || ""}
      </small>
    `;

      item.addEventListener("click", () => seleccionarCliente(cliente));
      list.appendChild(item);
    });
  }

  function seleccionarCliente(cliente) {
    presupuesto.cliente = cliente;

    container.querySelector("#clienteSeleccionado").textContent =
      `${cliente.apellido}, ${cliente.nombre}`;

    container.querySelector("#clienteInfo1").textContent =
      `Teléfono: ${cliente.telefono || "No disponible"}`;

    container.querySelector("#clienteInfo2").textContent =
      `CUIT: ${cliente.cuit || "No disponible"}`;

    clientesModal.hide();
  }

  container
    .querySelector("#clienteSearch")
    .addEventListener("input", function () {
      const filtro = this.value.toLowerCase();
      const items = container.querySelectorAll(
        "#clientesList .list-group-item",
      );

      items.forEach((item) => {
        item.style.display = item.textContent.toLowerCase().includes(filtro)
          ? ""
          : "none";
      });
    });

  function validarCliente() {
    if (!presupuesto.cliente) {
      alert("Debe seleccionar un cliente");
      return false;
    }
    return true;
  }

  const condBtns = container.querySelectorAll("#condicionPagoGroup button");

  condBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      condBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      presupuesto.condicionPago = btn.dataset.value;
      console.log("📦 condicionPago:", presupuesto.condicionPago);
    });
  });

  const inputTrabajo = container.querySelector("#inputTrabajo");

  inputTrabajo.addEventListener("input", () => {
    presupuesto.trabajo = inputTrabajo.value.trim();
  });

  const inputVendedor = container.querySelector("#inputVendedor");

  inputVendedor.addEventListener("input", () => {
    presupuesto.vendedor = inputVendedor.value.trim();
  });

  const inputValidez = container.querySelector("#inputValidez");

  inputValidez.addEventListener("change", () => {
    presupuesto.validez = inputValidez.value;
    console.log("📦 validez:", presupuesto.validez);
  });

  const chkManoObra = container.querySelector("#chkManoObra");
  const inputManoObra = container.querySelector("#inputManoObra");

  chkManoObra.addEventListener("change", () => {
    presupuesto.incluyeManoObra = chkManoObra.checked;
    inputManoObra.classList.toggle("d-none", !chkManoObra.checked);

    if (!chkManoObra.checked) {
      presupuesto.manoObra = 0;
      inputManoObra.value = "";
    }
  });

  inputManoObra.addEventListener("input", () => {
    presupuesto.manoObra = Number(inputManoObra.value) || 0;
    console.log("📦 manoObra:", presupuesto.manoObra);
  });

  let filtroPrecio = "contado";
  let filtroCategoria = "Accesorios";

  async function cargarProductos() {
    try {
      const params = new URLSearchParams({
        tipoPrecio: filtroPrecio,
        categoria: filtroCategoria,
      });

      const resp = await fetch(`/api/productos?${params}`);
      if (!resp.ok) throw new Error("Error cargando productos");

      const productos = await resp.json();
      renderProductos(productos);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar los productos", "error");
    }
  }

  function renderProductos(productos) {
    const tbody = container.querySelector("#productosList");
    tbody.innerHTML = "";

    productos.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${p.nombre}</td>
      <td class="text-center">${p.stock}</td>
      <td class="text-end">$ ${p.precio.toLocaleString()}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-success">Agregar</button>
      </td>
    `;
      tbody.appendChild(tr);
    });
  }

  function setupToggle(groupId, callback) {
    const buttons = container.querySelectorAll(`#${groupId} button`);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        callback(btn.dataset.value);
        cargarProductos();
      });
    });
  }

  setupToggle("precioGroup", (val) => (filtroPrecio = val));
  setupToggle("categoriaGroup", (val) => (filtroCategoria = val));

  const productosModal = new bootstrap.Modal(
    document.getElementById("productosModal"),
  );

  container
    .querySelector("button.btn-primary.btn-sm")
    .addEventListener("click", () => {
      cargarProductos();
      productosModal.show();
    });
}
