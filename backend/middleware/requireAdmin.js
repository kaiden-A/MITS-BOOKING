import jwt from 'jsonwebtoken';
import User from '../models/users.js';


export const requireAdmin = async (req , res , next) => {

    if (req.path === '/login' || req.path === '/admin/login') {
        return next();
    }

    const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json({cookies : false , msg : 'user doesnt have a cookies'})
    }

    try{

        const decodedToken = jwt.verify(token , process.env.JWT_SECRET);

        if(decodedToken.isAdmin){

            const user = await User.findById(decodedToken.id);

            if(!user){
                return res.status(401).json({cookies : false , msg : 'invalid Admin'});
            }

            req.user = user;
            next();
        }else{

           res.status(401).json({cookies : false , msg : 'doesnt have a cookies'}) 
        }


    }catch(err){

        res.json({cookies : false , msg : 'doesnt have a cookies'});
    }
}