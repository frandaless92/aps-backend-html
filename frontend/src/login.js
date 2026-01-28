const form = document.getElementById("loginForm");
const msg = document.getElementById("loginMsg");
const btn = document.getElementById("btnLogin");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  msg.textContent = "";
  msg.className = "text-center mt-3 small";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    msg.textContent = "Complete todos los campos";
    msg.classList.add("text-danger");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Verificando...";

  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.message || "Credenciales inválidas";
      msg.classList.add("text-danger");
      return;
    }

    msg.textContent = "Login correcto";
    msg.classList.add("text-success");

    // 🔜 siguiente paso: redirect
    // window.location.href = "/home.html";
  } catch (err) {
    msg.textContent = "Error de conexión con el servidor";
    msg.classList.add("text-danger");
  } finally {
    btn.disabled = false;
    btn.textContent = "Ingresar";
  }
});
