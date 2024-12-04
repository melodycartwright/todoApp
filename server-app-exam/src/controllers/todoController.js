const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
};

exports.createTodo = async (req, res) => {
    const { title } = req.body;
    const todo = new Todo({ title, userId: req.user.id });
    await todo.save();
    res.status(201).json(todo);
};

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
    res.json(updatedTodo);
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
};
