import { Router } from "express";
import { 
    get_homepage  , 
    post_reserve , 
    delete_reserve , 
    get_reserve_form , 
    get_user_profile, 
    post_change_password, 
    reserve_key,
    return_key
} from '../controller/userController.js';

const router = Router();


router.get('/dashboard' ,get_homepage );

router.get('/reservations' , get_reserve_form);
router.post('/reservations' , post_reserve);

router.post('/keys/:id/take' , reserve_key);
router.post('/keys/:id/return' , return_key);

router.get('/user' , get_user_profile);
router.post('/user' , post_change_password);

router.delete('/reservations/:reserveId', delete_reserve) ;


export default router;