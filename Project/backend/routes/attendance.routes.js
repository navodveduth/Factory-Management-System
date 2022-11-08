import express from 'express';
import {createAttendance, getAllAttendanceDetails, getOneAttendanceDetails, updateAttendance, deleteAttendance, getAttendanceByEmployeeNumber, getAllAttendanceByEmployeeNumber, getAttendanceByMonth} from '../controllers/Employee/attendance.controller.js';

const router = express.Router();

router.post('/createAttendance', createAttendance);
router.get('/viewAttendance', getAllAttendanceDetails);
router.get('/viewAttendance/:id', getOneAttendanceDetails);
router.put('/updateAttendance/:id', updateAttendance);
router.delete('/deleteAttendance/:id', deleteAttendance);
router.get('/viewAttendanceNum/:employeeNumber', getAttendanceByEmployeeNumber);
router.get('/viewAllAttendanceNum/:employeeNumber', getAllAttendanceByEmployeeNumber);
router.get('/viewAttendanceMonth/:year', getAttendanceByMonth);


export default router;
