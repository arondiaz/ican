import { Category } from "../models/Categories.js";
import { Worker } from "../models/Worker.js";

export const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.findAll({
      include: {
        model: Category,
        through: { attributes: [] },
      },
    });
    res.json(workers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createWorker = async (req, res) => {
  try {
    const { name, description, phone, city, categoryIds } = req.body;

    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return res
        .status(400)
        .json({ message: "should select one category or more." });
    }

    const newWorker = await Worker.create({
      name,
      description,
      phone,
      city,
    });

    await newWorker.setCategories(categoryIds);

    const workerWithCategories = await Worker.findByPk(newWorker.id, {
      include: Category,
    });

    return res.status(200).json(workerWithCategories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, city, phone, categoryIds } = req.body;

    const updateWorker = await Worker.findByPk(id, {
      include: {
        model: Category,
        through: { attributes: [] },
      },
    });
    if (categoryIds && categoryIds.length > 0) {
      await updateWorker.setCategories(categoryIds);
    }
    updateWorker.name = name;
    updateWorker.description = description;
    updateWorker.city = city;
    updateWorker.phone = phone;
    updateWorker.categoryIds = categoryIds;
    await updateWorker.save();

    res.json(updateWorker);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await Worker.destroy({ where: { id } });
    if (worker === 0) {
      return res
        .status(404)
        .json({ message: "worker with this id doesn´t exist" });
    }
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await Worker.findByPk(id, {
      include: {
        model: Category,
        through: { attributes: [] },
      },
    });
    if (worker == null) {
      return res.status(404).send("worker doesn't exist");
    }
    res.json(worker);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
