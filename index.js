import "dotenv/config"
import "express-async-errors"
import express from "express"
import morgan from "morgan"
import cors from "cors"

import { connectDB } from "./lib/db.js";
import {todoController} from "./controllers/todo.controller.js";

const app = express();

connectDB();

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))

app.post('/todo', todoController.addTodo);
app.delete('/todo/:id', todoController.deleteTodo);
app.get('/todo', todoController.getTodos);
app.put('/todo/reorder', todoController.updateTodosOrder);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
})