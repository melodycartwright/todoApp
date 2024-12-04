const API_URL = '/api';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const todoForm = document.getElementById('todoForm');

    // Register a new user
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();
                const messageElem = document.getElementById('registerMessage');
                if (response.status === 201) {
                    messageElem.textContent = 'Account created successfully! Redirecting to login...';
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                } else {
                    messageElem.textContent = data.message || 'Error during registration';
                }
            } catch (error) {
                console.error('Registration error:', error);
            }
        });
    }

    // Log in a user
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();
                const messageElem = document.getElementById('loginMessage');
                if (response.status === 200) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'todo.html';
                } else {
                    messageElem.textContent = data.message || 'Login failed';
                }
            } catch (error) {
                console.error('Login error:', error);
            }
        });
    }

    // Add and manage todos
    if (todoForm) {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
        }

        const todoInput = document.getElementById('todoInput');
        const todoList = document.getElementById('todoList');

        // Fetch Todos
        const fetchTodos = async () => {
            const response = await fetch(`${API_URL}/todos`, {
                headers: { Authorization: token },
            });
            const todos = await response.json();
            renderTodos(todos);
        };

        // Render Todos
        const renderTodos = (todos) => {
            todoList.innerHTML = '';
            todos.forEach((todo) => {
                const li = document.createElement('li');
                li.textContent = todo.title;
                li.classList.toggle('completed', todo.completed);

                // Checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.completed;
                checkbox.addEventListener('change', async () => {
                    await fetch(`${API_URL}/todos/${todo._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                        body: JSON.stringify({ completed: checkbox.checked }),
                    });
                    fetchTodos();
                });

                // Delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', async () => {
                    await fetch(`${API_URL}/todos/${todo._id}`, {
                        method: 'DELETE',
                        headers: { Authorization: token },
                    });
                    fetchTodos();
                });

                li.appendChild(checkbox);
                li.appendChild(deleteBtn);
                todoList.appendChild(li);
            });
        };

        // Add a Todo
        todoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = todoInput.value;
            await fetch(`${API_URL}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ title }),
            });
            todoInput.value = '';
            fetchTodos();
        });

        fetchTodos();
    }
});
