import app from "./app.js";
import { sequelize } from "./database/database.js";
import "./models/index.js";
import { Category } from "./models/Categories.js";

const port = 4444;

async function main() {
  try {
    await sequelize.sync({ force: false });
    const count = await Category.count();
    if (count === 0) {
      await Category.bulkCreate([
        { name: "Electricista" },
        { name: "Plomero" },
        { name: "Carpintero" },
        { name: "Gasista" },
        { name: "Mecanico" },
        { name: "Gomero" },
        { name: "Instalador de aire" },
        { name: "Cerrajero" },
      ]);
      console.log("Categorías iniciales creadas");
    }
    app.listen(port);

    console.log("Server working on port", port);
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
}

main();
