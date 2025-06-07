const app = require("./app");
const sequelize = require("./database/sequelize");
const { PORT } = require("./config/constants");

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("DB synced");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(`Error starting server: ${err}`);
  }
})();
