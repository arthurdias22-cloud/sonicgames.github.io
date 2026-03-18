let users = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "user", password: "abcd", role: "user" }
];

let posts = [
  { id: 1, title: "Sonic é rápido!", content: "Sonic pode correr mais rápido que o som!" }
];

let currentUser = null;

function showLogin() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <h2>Login</h2>
    <input id="username" placeholder="Usuário"><br>
    <input id="password" placeholder="Senha" type="password"><br>
    <button onclick="login()">Entrar</button>
  `;
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    alert(`Bem-vindo ${user.username}!`);
    showPosts();
  } else {
    alert("Usuário ou senha inválidos!");
  }
}

function showPosts() {
  const main = document.getElementById('main-content');
  let html = `<h2>Posts</h2>`;

  posts.forEach(post => {
    html += `<div>
      <h3>${post.title}</h3>
      <p>${post.content}</p>`;
    if (currentUser && currentUser.role === "admin") {
      html += `<button onclick="editPost(${post.id})">Editar</button>
               <button onclick="deletePost(${post.id})">Deletar</button>`;
    }
    html += `</div>`;
  });

  if (currentUser && currentUser.role === "admin") {
    html += `<h3>Criar Novo Post</h3>
      <input id="new-title" placeholder="Título"><br>
      <textarea id="new-content" placeholder="Conteúdo"></textarea><br>
      <button onclick="createPost()">Criar</button>`;
  }

  main.innerHTML = html;
}

function createPost() {
  const title = document.getElementById('new-title').value;
  const content = document.getElementById('new-content').value;
  posts.push({ id: posts.length + 1, title, content });
  showPosts();
}

function editPost(id) {
  const post = posts.find(p => p.id === id);
  const newTitle = prompt("Novo título:", post.title);
  const newContent = prompt("Novo conteúdo:", post.content);
  post.title = newTitle;
  post.content = newContent;
  showPosts();
}

function deletePost(id) {
  posts = posts.filter(p => p.id !== id);
  showPosts();
}
