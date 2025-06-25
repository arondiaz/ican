import { Category } from "../models/Categories.js";
import { Worker } from "../models/Worker.js";
import { Op } from "sequelize";

export const getAllWorkersPerCategory = async (req, res) => {
  try {
    const cat = await Category.findOne({
      where: { name: req.params.name },
      include: {
        model: Worker,
        through: { attributes: [] },
      },
    });

    if (!cat) {
      return res.status(404).json({ message: "Categoría no encontrada." });
    }

    return res.status(200).json(cat);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Función para normalizar y limpiar el texto
function normalize(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quita tildes
    .toLowerCase();
}

// Extraer categoría y ciudad si están presentes
function extractCategoryAndCity(text, knownCities = [], knowCategories) {
  const words = text.toLowerCase().split(" ");
  const city = knownCities.find((c) =>
    words.some((word) => c.toLowerCase().startsWith(word))
  );

  const category = knowCategories.find((c) =>
    words.some((word) => c.name.toLowerCase().startsWith(word))
  );

  const categoryId = category?.value;
  console.log("CATEGORY", categoryId);
  console.log("CITY", city);

  return { categoryId, city };
}

const knowCategories = [
  { value: "1", name: "Electricista" },
  { value: "2", name: "Plomero" },
  { value: "3", name: "Carpintero" },
  { value: "4", name: "Gasista" },
  { value: "5", name: "Mecanico" },
  { value: "6", name: "Gomero" },
  { value: "7", name: "Instalador de aire" },
  { value: "8", name: "Cerrajero" },
  { value: "9", name: "Jardinero" },
  { value: "10", name: "Limpieza" },
];

const knownCities = ["rosario", "casilda", "santa fe"];

export const mainSearch = async (req, res) => {
  const rawSearch = req.params.search;
  const normalizedSearch = normalize(rawSearch);

  const { categoryId, city } = extractCategoryAndCity(
    normalizedSearch,
    knownCities,
    knowCategories
  );

  if (!categoryId) {
    return res.status(404).json({ message: "Categoría no encontrada" });
  }

  const whereClause = {};
  if (city) {
    whereClause.city = { [Op.like]: `%${city}%` };
  }

  try {
    const workers = await Worker.findAll({
      where: whereClause,
      include: [
        {
          model: Category,
          where: {
            id: categoryId,
          },
          through: { attributes: [] },
        },
      ],
    });

    if (!workers.length) {
      return res
        .status(404)
        .json({ message: "No se encontraron trabajadores" });
    }

    res.status(200).json(workers);
  } catch (err) {
    console.error("Error al buscar servicios:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
