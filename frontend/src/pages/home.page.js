export function initHome() {
  const token = sessionStorage.getItem("auth_token");

  if (!token) {
    window.location.href = "/";
    return;
  }

  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("auth_token");
    window.location.href = "/";
  });
}
