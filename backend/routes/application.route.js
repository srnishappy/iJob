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

// สมัครงาน
router.post('/apply/:id', applyJob);

// ดูงานที่สมัครไว้
router.get('/get', getAppliedJobs);

// แอดมินดูผู้สมัครของงาน
router.get('/:id/applicants', getApplicants);

// อัปเดตสถานะใบสมัคร
router.post('/status/:id/update', updateStatus);

export default router;
