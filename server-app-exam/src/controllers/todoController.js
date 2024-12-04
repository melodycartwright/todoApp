const Todo = require('../models/todoModel');

exports.createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const newTodo = new Todo({ title, userId: req.user.id });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: 'Error creating To-Do' });
    }
};

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching To-Dos' });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const todo = await Todo.findOneAndUpdate({ _id: id, userId: req.user.id }, updates, { new: true });
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Error updating To-Do' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error deleting To-Do' });
    }
};
