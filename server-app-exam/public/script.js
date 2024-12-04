document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Registration logic here
    alert('Registered successfully!');
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Login logic here
    document.getElementById('todoList').style.display = 'block';
});

document.getElementById('addTodo').addEventListener('click', function() {
    const todoInput = document.getElementById('todoInput');
    const todoItems = document.getElementById('todoItems');
    const newTodo = document.createElement('li');
    newTodo.textContent = todoInput.value;
    todoItems.appendChild(newTodo);
    todoInput.value = '';
});