function showProfile() {
  const main = document.getElementById('profile-content');
  if (!currentUser) {
    main.innerHTML = `<p>Você não está logado. <a href="login.html">Login</a></p>`;
    return;
  }

  main.innerHTML = `
    <h2>Perfil de ${currentUser.username}</h2>
    <p>Função: ${currentUser.role}</p>
    <button onclick="logout()">Sair</button>
  `;
}

function logout() {
  currentUser = null;
  alert("Você saiu!");
  window.location.href = "index.html";
}
