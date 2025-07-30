const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const saveBtn = document.getElementById('save-server');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    updateTodos();
    input.value = '';
  }
});

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${todo.text}</span>
      <button onclick="deleteTodo(${index})">✖</button>
    `;
    li.addEventListener('click', () => toggleComplete(index));
    list.appendChild(li);
  });
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  updateTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  updateTodos();
}

function updateTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

saveBtn.addEventListener('click', () => {
  fetch('save.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todos)
  })
    .then(response => response.text())
    .then(data => alert('✅ Disimpan ke server!\n\n' + data))
    .catch(error => alert('❌ Gagal simpan: ' + error));
});
