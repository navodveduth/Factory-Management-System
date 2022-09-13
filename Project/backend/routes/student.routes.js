import {getAllStudents, addStudent} from "../controllers/student.controller.js";
import express from "express";

const router = express.Router();

router.get("/", getAllStudents); 
router.post("/create", addStudent); 

export default router;