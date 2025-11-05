import { Router } from "express";
import userRoutes from './userRoutes.js';
import { post_login  , post_signUp , delete_user} from '../controller/authController.js'
import {requireAuth} from '../middleware/requireAuth.js'
const router = Router();



router.post('/login' , post_login);
router.post('/signup' , post_signUp);

router.get('/logout' , delete_user);

router.use('/' , requireAuth , userRoutes );

export default router;