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
        // Récupérer la position la plus élevée pour ajouter à la fin (sécurisé)
        const lastTodo = await Todo.findOne().sort({ position: -1 });
        const lastPos = lastTodo && typeof lastTodo.position === 'number' ? lastTodo.position : -1;
        const newPosition = lastPos + 1;
        
        const newTodo = new Todo({
            title,
            isCompleted: false,  // Ajouter explicitement
            position: newPosition  // Ajouter explicitement
        });

        const todo = await newTodo.save();
        return todo;
    },

    updateTodo: async (id, updates) => {
        console.log('[service.updateTodo] id =', id, 'updates =', updates);
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