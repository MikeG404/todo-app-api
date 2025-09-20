import { todoService } from "../services/todo.service.js"

export const todoController = {
    getTodos: async (req, res) => {
        try {
            const todos = await todoService.getTodos();
            
            if (!todos) {
                return res.status(400).json({ error: "No todos found" });
            }

            return res.status(200).json(todos);
        } catch (error) {
            console.error('Error getting todos:', error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    addTodo: async (req, res) => {
        try {
            const { title } = req.body;

            if (!title || title.trim() === '') {
                return res.status(400).json({ error: "Title is required" });
            }

            const todo = await todoService.addTodo(title.trim());

            if (!todo) {
                return res.status(400).json({ error: "Failed to create todo" });
            }

            return res.status(201).json(todo);
        } catch (error) {
            console.error('Error adding todo:', error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    updateTodo: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            console.log('[PUT /todo/:id] id =', id, 'updates =', updates);

            if (!id) {
                return res.status(400).json({ error: "Todo ID is required" });
            }

            const todo = await todoService.updateTodo(id, updates);

            if (!todo) {
                return res.status(404).json({ error: "Todo not found" });
            }

            return res.status(200).json(todo);
        } catch (error) {
            console.error('Error updating todo:', error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    updateTodosOrder: async (req, res) => {
        try {
            const { todos } = req.body;

            if (!Array.isArray(todos)) {
                return res.status(400).json({ error: "Todos array is required" });
            }

            const updatedTodos = await todoService.updateTodosOrder(todos);

            return res.status(200).json(updatedTodos);
        } catch (error) {
            console.error('Error updating todos order:', error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    deleteTodo: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "Todo ID is required" });
            }

            const deletedTodo = await todoService.deleteTodo(id);

            if (!deletedTodo) {
                return res.status(404).json({ error: "Todo not found" });
            }

            return res.status(200).json({ message: "Todo deleted successfully", todo: deletedTodo });
        } catch (error) {
            console.error('Error deleting todo:', error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}