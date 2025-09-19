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
app.use(cors())

app.post('/todo', todoController.addTodo);
app.delete('/todo/:id', todoController.deleteTodo);
app.get('/todo', todoController.getTodos);

morgan('tiny');

app.listen(3000, () => {
    console.log("Server launched");
})