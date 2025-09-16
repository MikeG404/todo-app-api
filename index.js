import "dotenv/config"
import express from "express"
import morgan from "morgan"

import { connectDB } from "./lib/db.js";

import { Todo } from "./models/todo.model.js";

const app = express();

connectDB();

morgan('tiny');

const newTodo = new Todo ({
    title: "Apprendre Javascript",
})

newTodo.save()
    .then((todo) => {
        console.log("Notre nouvelle todo ", todo)
    })
    .catch((error) => {
        console.error(error.message)
    })

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log("Server launched");
})