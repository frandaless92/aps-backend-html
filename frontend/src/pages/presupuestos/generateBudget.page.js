// src/pages/presupuestos/generateBudget.page.js
import * as bootstrap from "bootstrap";

export function renderGenerateBudget(container) {
  container.innerHTML = `
    <main class="container-fluid py-5">
      <div class="row g-4">

        <!-- =========================
            COLUMNA IZQUIERDA
        ========================== -->
        <div class="col-12 col-lg-4">

          <!-- CLIENTE -->
          <div class="card mb-4 shadow-sm">
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
          <div class="card shadow-sm">
            <div class="card-body">
              <h6 class="fw-bold mb-3">Datos del presupuesto</h6>

              <!-- CONDICIÓN DE PAGO -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Condición de pago</label>
                <div class="btn-group w-100">
                  <button class="btn btn-outline-primary">Contado</button>
                  <button class="btn btn-outline-primary">Débito</button>
                  <button class="btn btn-outline-primary">Crédito</button>
                </div>
              </div>

              <!-- REFERENCIA -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Referencia de pago</label>
                <div class="btn-group w-100">
                  <button class="btn btn-outline-secondary">Efectivo</button>
                  <button class="btn btn-outline-secondary">Transferencia</button>
                  <button class="btn btn-outline-secondary">Tarjeta</button>
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
                  type="number"
                  class="form-control"
                  placeholder="Importe de mano de obra"
                />
              </div>

              <!-- TRABAJO -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Trabajo</label>
                <input class="form-control" placeholder="Nombre de quien trabajó" />
              </div>

              <!-- VENDEDOR -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Vendedor</label>
                <input class="form-control" placeholder="Nombre del vendedor" />
              </div>

              <!-- VALIDEZ -->
              <div>
                <label class="form-label fw-semibold">Validez</label>
                <input type="date" class="form-control" />
              </div>
            </div>
          </div>
        </div>

        <!-- =========================
            COLUMNA DERECHA
        ========================== -->
        <div class="col-12 col-lg-8">

          <!-- PRODUCTOS -->
          <div class="card shadow-sm mb-4">
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
                    <tr>
                      <td>Producto ejemplo</td>
                      <td class="text-center">2</td>
                      <td class="text-end">$1.200</td>
                      <td class="text-end fw-bold">$2.400</td>
                      <td class="text-end">
                        <button class="btn btn-danger btn-sm">×</button>
                      </td>
                    </tr>
                    <!-- más filas -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- RESUMEN TOTAL -->
          <div class="card shadow-sm">
            <div class="card-body">

              <div class="d-flex justify-content-between mb-2">
                <span>Subtotal productos</span>
                <span>$20.400</span>
              </div>

              <div class="d-flex justify-content-between mb-2">
                <span>Mano de obra</span>
                <span>$5.000</span>
              </div>

              <hr />

              <div class="d-flex justify-content-between align-items-center">
                <h5 class="fw-bold mb-0">TOTAL</h5>
                <h4 class="fw-bold text-success mb-0">$25.400</h4>
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

    </main>

  `;

  // ====== ESTADO ======
  let condicionPago = "Contado";
  let referenciaPago = "Efectivo";
  let incluyeManoObra = false;
  let manoObra = 0;
  let clienteSeleccionado = null;

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

  // ====== MANO DE OBRA ======
  const chkManoObra = container.querySelector("#chkManoObra");
  const inputManoObra = container.querySelector("#inputManoObra");

  chkManoObra.addEventListener("change", () => {
    incluyeManoObra = chkManoObra.checked;
    inputManoObra.classList.toggle("d-none", !incluyeManoObra);
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
    try {
      const resp = await fetch("/api/clientes");
      if (!resp.ok) throw new Error("Error al cargar clientes");

      const clientes = await resp.json();
      renderClientes(clientes);
      clientesModal.show();
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar los clientes");
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
    clienteSeleccionado = cliente;

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
}
