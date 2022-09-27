import express from 'express';
import {
  createDriverDetails,
  getDriverDetailById,
  getDriverDetails,
  updateDriverDetails,
  deleteDriverDetails,
} from '../controllers/Transport/driver.controller.js';

const router = express.Router();

router.get('/', getDriverDetails);
router.get('/:id', getDriverDetailById);
router.post('/create', createDriverDetails);
router.put('/update/:id', updateDriverDetails);
router.delete('/delete/:id', deleteDriverDetails);

export default router;
