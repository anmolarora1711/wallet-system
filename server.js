const app = require("./app");
const sequelize = require("./database/sequelize");
const { PORT } = require("./config/constants");

let server;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("DB synced");

    server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      gracefulShutdown();
    });
    process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Rejection:", reason);
      gracefulShutdown();
    });
  } catch (err) {
    console.log(`Error starting server: ${err}`);
  }
})();

async function gracefulShutdown() {
  console.log("\n Starting graceful shutdown...");

  if (server) {
    // Stop accepting new requests
    await new Promise((resolve) => {
      server.close(() => {
        console.log("HTTP server closed");
        resolve();
      });
    });
  }

  try {
    await sequelize.close();
    console.log("Database connection closed.");
  } catch (err) {
    console.error("Error closing database connection:", err);
  }

  console.log("Exiting process now.");
  process.exit(0);
}
