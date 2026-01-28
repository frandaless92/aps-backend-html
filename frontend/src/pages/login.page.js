export function initLogin() {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("loginMsg");
  const btn = document.getElementById("btnLogin");

  // seguridad defensiva: si el HTML no está completo, no inicializa
  if (!form || !msg || !btn) return;

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

      if (!res.ok || !data.success) {
        msg.textContent = data.message || "Credenciales inválidas";
        msg.classList.add("text-danger");
        return;
      }

      // guardar token
      sessionStorage.setItem("auth_token", data.token);

      msg.textContent = data.message || "Login OK";
      msg.classList.add("text-success");

      setTimeout(() => {
        window.location.href = "/home.html";
      }, 800);
    } catch (err) {
      msg.textContent = "Error de conexión con el servidor";
      msg.classList.add("text-danger");
    } finally {
      btn.disabled = false;
      btn.textContent = "Ingresar";
    }
  });
}
