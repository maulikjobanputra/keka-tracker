import { Router } from 'express';
import { DefaultController } from '../controllers/controllers';
import { asyncWrapper } from '../utils/async-wrapper';

const router = Router();
const controller = new DefaultController();
const { defaultController, hoursController, partialController, averageController } = controller;

router.get('/', asyncWrapper(defaultController));
router.get('/hours', asyncWrapper(hoursController));
router.get('/partial', asyncWrapper(partialController));
router.get('/average', asyncWrapper(averageController));

export default router;
