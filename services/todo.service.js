import { Todo } from '../models/todo.model.js'

export const todoService = {
    getTodos: async () => {
        const todos = await Todo.find().sort({ position: 1 });
        
        if (!todos) {
            console.log("No todos");
        }

        return todos;
    },

    addTodo: async (title) => {
        const lastTodo = await Todo.findOne().sort({ position: -1 });
        const newPosition = lastTodo ? lastTodo.position + 1 : 0;
        
        const newTodo = new Todo({
            title,
            isCompleted: false,
            position: newPosition
        });

        const todo = await newTodo.save();
        return todo;
    },

    updateTodo: async (id, updates) => {
        const todo = await Todo.findByIdAndUpdate(
            id, 
            updates, 
            { new: true, runValidators: true }
        );
        
        if (!todo) {
            throw new Error('Todo not found');
        }
        
        return todo;
    },

    updateTodosOrder: async (todos) => {
        try {
            const bulkOps = todos.map(todo => ({
                updateOne: {
                    filter: { _id: todo._id },
                    update: { position: todo.position }
                }
            }));

            await Todo.bulkWrite(bulkOps);
            
            return await Todo.find().sort({ position: 1 });
        } catch (error) {
            throw new Error('Failed to update todos order');
        }
    },

    deleteTodo: async (_id) => {
        const todoDeleted = await Todo.findByIdAndDelete(_id);
        
        if (!todoDeleted) {
            throw new Error('Todo not found');
        }

        await todoService.reorderPositions();
        
        return todoDeleted;
    },

    reorderPositions: async () => {
        const todos = await Todo.find().sort({ position: 1 });
        
        const bulkOps = todos.map((todo, index) => ({
            updateOne: {
                filter: { _id: todo._id },
                update: { position: index }
            }
        }));

        if (bulkOps.length > 0) {
            await Todo.bulkWrite(bulkOps);
        }
    }
}