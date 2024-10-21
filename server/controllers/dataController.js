// controllers/dataController.js
import DataModel from "../models/DataModel.js";

// Get all data
export const getAllData = async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get data by ID
export const getDataById = async (req, res) => {
  try {
    const data = await DataModel.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new data
export const createData = async (req, res) => {
  const newData = new DataModel(req.body);
  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update data by ID
export const updateData = async (req, res) => {
  try {
    const updatedData = await DataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete data by ID
export const deleteData = async (req, res) => {
  try {
    await DataModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
