import express from 'express';
import {
  createTransportDetails,
  getTransportDetailById,
  getTransportDetails,
  getDateRangeTransport,
  updateTransportDetails,
  deleteTransportDetails,
} from '../controllers/Transport/transport.controller.js';

const router = express.Router();

router.get('/', getTransportDetails);
router.get('/:id', getTransportDetailById);
router.get('/date/:DS/:DE', getDateRangeTransport);
router.post('/create', createTransportDetails);
router.put('/update/:id', updateTransportDetails);
router.delete('/delete/:id', deleteTransportDetails);

export default router;
