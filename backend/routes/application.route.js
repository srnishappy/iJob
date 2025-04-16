import express from 'express';
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from '../controllers/application.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.use(isAuthenticated);

router.post('/apply/:id', applyJob);

router.get('/get', getAppliedJobs);

router.get('/:id/applicants', getApplicants);

router.post('/status/:id/update', updateStatus);

export default router;
