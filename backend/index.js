import app from "./app.js";
import { sequelize } from "./database/database.js";
import "./models/index.js";


const port = 4444;

async function main() {
  try {
    await sequelize.sync({force: true});
    app.listen(port);

    console.log("Server working on port", port);
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
}

main();
