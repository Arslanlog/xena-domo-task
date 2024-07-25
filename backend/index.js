import express from "express";
import'express-async-errors';
import { config } from "dotenv";
import cors from "cors";
import { errorHandler, router } from "./app/index.js";
import morgan from"morgan";

config();
const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})