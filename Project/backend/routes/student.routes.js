import {getAllStudents, getOneStudent, addStudent, updateStudent, deleteStudent} from "../controllers/student.controller.js";
import express from "express";

const router = express.Router();

router.get("/", getAllStudents); 
router.get("/:id", getOneStudent);
router.post("/create", addStudent); 
router.delete("/delete/:id", deleteStudent);
router.put("/update/:id", updateStudent)

export default router;