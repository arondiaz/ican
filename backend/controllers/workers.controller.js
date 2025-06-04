import { Worker } from "../models/Worker.js";

export const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.findAll();
    res.json(workers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createWorker = async (req, res) => {
  try {
    const { name, description, phone, city } = req.body;

    const newWorker = await Worker.create({
      name,
      description,
      phone,
      city,
    });
    res.json(newWorker);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
