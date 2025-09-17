import { Todo } from '../models/todo.model.js'

export const todoService = {
    getTodos: async () => {
        const todos = await Todo.find();
        console.log(todos);
        
        if (!todos) {
            console.log("No todos");
        }

        return todos;
    },

    addTodo: async (title) => {
        
        const newTodo = new Todo ({
            title,
        })

        const todo = await newTodo.save()

        return todo;
    },

    deleteTodo: async () => {

    }
}