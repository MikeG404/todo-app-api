import {todoService} from "../services/todo.service.js"

export const todoController = {
    getTodos: async (req, res) => {
        console.log('ça pete');
        
        const todos = await todoService.getTodos();
        console.log(todos);
        
        if (!todos) {
            return res.status(400);
        }

        return res.status(200).json(todos)
    },

    addTodo: async (req, res) => {
        const { title } = req.body

        const todo = await todoService.addTodo(title);

        if (!todo) {
            return res.status(400)
        }

        return res.status(200).json(todo);
    },

    deleteTodo: async (req, res) => {
        
    }
}