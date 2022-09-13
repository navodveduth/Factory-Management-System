import Student from "../models/student.model.js"; //add file extention

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
} 

export const addStudent = async (req, res) => {
    try {
        const student = req.body;
        const newStudent = new Student(student);
        await newStudent.save();
        res.status(200).json(newStudent);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}


