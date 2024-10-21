import express from "express";
import { getAllData, getDataById, createData, updateData, deleteData } from "../controllers/dataController.js";

const router = express.Router();

router.get("/", getAllData);
router.get("/:id", getDataById);
router.post("/", createData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

export default router;
