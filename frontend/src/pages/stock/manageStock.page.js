import { animateFadeUp } from "../../utils/animate";

export function renderManageStock(container) {
  container.innerHTML = `
    <main class="container-fluid py-5">
      <div class="row g-4">

        <!-- =========================
            FORMULARIO
        ========================== -->
        <div class="col-12 col-lg-4">
          <div class="card shadow-sm fade-up">
            <div class="card-body">

              <h6 class="fw-bold mb-3">Control de Inventario</h6>

              <!-- TIPO -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Tipo</label>
                <select id="tipoProducto" class="form-select">
                  <option value="ACCESORIOS">Accesorios</option>
                  <option value="TEJIDOS">Tejidos</option>
                </select>
              </div>

              <!-- DESCRIPCION -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Descripción</label>
                <input id="inputDescripcion" class="form-control" />
              </div>

              <!-- STOCK -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Stock</label>
                <input id="inputStock" type="number" class="form-control" />
              </div>

              <!-- PRECIOS -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Precio contado</label>
                <input id="inputPrecio" type="number" class="form-control" />
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold">Precio lista</label>
                <input id="inputPrecioLista" type="number" class="form-control" />
              </div>

              <!-- BOTONES -->
              <div class="d-grid gap-2">
                <button id="btnAgregar" class="btn btn-success">Agregar</button>
                <button id="btnModificar" class="btn btn-primary" disabled>Modificar</button>
                <button id="btnEliminar" class="btn btn-danger" disabled>Eliminar</button>
                <button id="btnLimpiar" class="btn btn-outline-secondary">Limpiar</button>
              </div>

            </div>
          </div>
        </div>

        <!-- =========================
            TABLA
        ========================== -->
        <div class="col-12 col-lg-8">
          <div class="card shadow-sm fade-up">
            <div class="card-body">

              <h6 class="fw-bold mb-3">Productos</h6>

              <div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th>Descripción</th>
                      <th class="text-center">Stock</th>
                      <th class="text-end">Contado</th>
                      <th class="text-end">Lista</th>
                    </tr>
                  </thead>
                  <tbody id="tablaStock"></tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  `;

  animateFadeUp(container);

  // =============================
  // 🧠 ESTADO
  // =============================
  let productos = [];
  let productoSeleccionado = null;

  // =============================
  // 📌 DOM
  // =============================
  const tipoProducto = container.querySelector("#tipoProducto");
  const descripcion = container.querySelector("#inputDescripcion");
  const stock = container.querySelector("#inputStock");
  const precio = container.querySelector("#inputPrecio");
  const precioLista = container.querySelector("#inputPrecioLista");

  const btnAgregar = container.querySelector("#btnAgregar");
  const btnModificar = container.querySelector("#btnModificar");
  const btnEliminar = container.querySelector("#btnEliminar");
  const btnLimpiar = container.querySelector("#btnLimpiar");

  const tabla = container.querySelector("#tablaStock");

  // =============================
  // 🔄 CARGAR PRODUCTOS
  // =============================
  async function cargarProductos() {
    try {
      const resp = await fetch(
        `/api/productos?categoria=${tipoProducto.value}`,
      );
      productos = await resp.json();
      renderTabla();
    } catch {
      Swal.fire("Error", "No se pudo cargar el stock", "error");
    }
  }

  // =============================
  // 🧾 RENDER TABLA
  // =============================
  function renderTabla() {
    tabla.innerHTML = "";

    productos.forEach((p) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${p.nombre}</td>
        <td class="text-center">${p.stock}</td>
        <td class="text-end">$ ${p.precio}</td>
        <td class="text-end">$ ${p.precio_lista}</td>
      `;

      tr.addEventListener("click", () => seleccionarProducto(p));
      tabla.appendChild(tr);
    });
  }

  // =============================
  // ✏️ SELECCIONAR
  // =============================
  function seleccionarProducto(p) {
    productoSeleccionado = p;

    descripcion.value = p.nombre;
    stock.value = p.stock;
    precio.value = p.precio;
    precioLista.value = p.precio_lista;

    btnModificar.disabled = false;
    btnEliminar.disabled = false;
    btnAgregar.disabled = true;
  }

  // =============================
  // ➕ AGREGAR
  // =============================
  btnAgregar.addEventListener("click", async () => {
    await fetch("/api/stock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: tipoProducto.value,
        descripcion: descripcion.value,
        stock: Number(stock.value),
        precio: Number(precio.value),
        precio_lista: Number(precioLista.value),
      }),
    });

    limpiar();
    cargarProductos();
  });

  // =============================
  // ✏️ MODIFICAR
  // =============================
  btnModificar.addEventListener("click", async () => {
    if (!productoSeleccionado) return;

    await fetch(`/api/stock/${productoSeleccionado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descripcion: descripcion.value,
        stock: Number(stock.value),
        precio: Number(precio.value),
        precio_lista: Number(precioLista.value),
      }),
    });

    limpiar();
    cargarProductos();
  });

  // =============================
  // ❌ ELIMINAR
  // =============================
  btnEliminar.addEventListener("click", async () => {
    if (!productoSeleccionado) return;

    const r = await Swal.fire({
      title: "Eliminar producto",
      text: "¿Confirma eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    });

    if (!r.isConfirmed) return;

    await fetch(`/api/stock/${productoSeleccionado.id}`, {
      method: "DELETE",
    });

    limpiar();
    cargarProductos();
  });

  // =============================
  // 🧹 LIMPIAR
  // =============================
  function limpiar() {
    productoSeleccionado = null;

    descripcion.value = "";
    stock.value = "";
    precio.value = "";
    precioLista.value = "";

    btnAgregar.disabled = false;
    btnModificar.disabled = true;
    btnEliminar.disabled = true;
  }

  btnLimpiar.addEventListener("click", limpiar);

  tipoProducto.addEventListener("change", () => {
    limpiar();
    cargarProductos();
  });

  // 🚀 INIT
  cargarProductos();
}
