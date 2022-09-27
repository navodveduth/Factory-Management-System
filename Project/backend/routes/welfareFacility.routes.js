import express from 'express';
import {createWelfareFacility, getAllWelfareFacilityDetails, getOneWelfareFacilityDetails, updateWelfareFacility, deleteWelfareFacility} from '../controllers/Employee/welfareFacility.controller.js';

const router = express.Router();

router.post('/createWelfareFacility', createWelfareFacility);
router.get('/viewWelfareFacility', getAllWelfareFacilityDetails);
router.get('/viewWelfareFacility/:id', getOneWelfareFacilityDetails);
router.put('/updateWelfareFacility/:id', updateWelfareFacility);
router.delete('/deleteWelfareFacility/:id', deleteWelfareFacility);

export default router;