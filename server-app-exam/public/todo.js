const API_BASE = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

if (!token) window.location.href = 'index.html';

const fetchTodos = async () => {
    const res = await fetch(`${API_BASE}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};

const renderTodos = (todos) => {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        list.appendChild(li);
    });
};

document.getElementById('add-todo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = e.target['todo-input'].value;
    await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title }),
    });
    e.target.reset();
    const todos = await fetchTodos();
    renderTodos(todos);
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

(async () => {
    const todos = await fetchTodos();
    renderTodos(todos);
})();
