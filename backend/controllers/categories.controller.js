import { Category } from "../models/Categories.js";
import { Worker } from "../models/Worker.js";

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
