const express = require("express");
require('express-async-errors');
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 9000;
const { errorHandler } = require("./controller");
const router = require("./router");

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