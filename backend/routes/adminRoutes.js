import { Router } from "express";
import { post_login , delete_user, post_signUp } from "../controller/authController.js";
import { 
    get_homepage , 
    post_venue , 
    get_active_reservations , 
    get_past_reservations , 
    update_status_venues , 
    get_venue_inventory, post_news, 
    delete_news,
    get_keys,
    delete_user_status,
    delete_reserve,
    mass_booking
} from "../controller/adminController.js";

import { requireAdmin } from '../middleware/requireAdmin.js';
const router = Router();


router.get('/' , requireAdmin , (req , res) => {
    res.json({cookies : true , msg : 'Valid Admin User'})
})

router.get('/dashboard' , requireAdmin , get_homepage);

router.post('/login' ,post_login);

router.get('/logout'  , delete_user);

router.post('/venues' , requireAdmin , post_venue);
router.put('/venues/:id' , requireAdmin , update_status_venues);
router.get('/venues/inventories' , requireAdmin , get_venue_inventory);

router.get('/past/reservations' , requireAdmin , get_past_reservations);
router.get('/active/reservations', requireAdmin , get_active_reservations);
router.delete('/reservations/:reserveId', delete_reserve) ;

router.post('/news' , requireAdmin , post_news);
router.delete('/news/:id' , requireAdmin , delete_news);

router.post('/users' , requireAdmin , post_signUp);
router.delete('/users/:id' , requireAdmin , delete_user_status);

router.get('/keys' , get_keys);

router.post('/bookings' , mass_booking);

export default router;