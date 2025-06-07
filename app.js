const express = require("express");
const cors = require("cors");

const walletRoutes = require("./routes/wallet.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", walletRoutes);

// Centralized Error Handling
app.use(errorHandler);

module.exports = app;
