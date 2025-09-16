import { Todo } from '../models/todo.model.js'

export const todoService = {
    getTodos: async () => {

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