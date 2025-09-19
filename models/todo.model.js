import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
    position: {
        type: Number,
        required: true
    }
})

export const Todo = mongoose.model('Todo', todoSchema);