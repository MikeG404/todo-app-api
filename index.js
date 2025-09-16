import "dotenv/config"
import express from "express"
import morgan from "morgan"
import { connectDB } from "./lib/db.js";

const app = express();

connectDB();

morgan('tiny');

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log("Server launched");
})