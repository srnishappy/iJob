import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from '../controllers/company.controller.js';

const router = express.Router();

router.use(isAuthenticated);

router.post('/register', registerCompany);
router.get('/get', getCompany);
router.get('/get/:id', getCompanyById);
router.put('/update/:id', updateCompany);

export default router;
