import User from '../models/users.js';
import jwt from 'jsonwebtoken';



const maxAge = 5 * 24 * 60 * 60;

const createToken = (id , isAdmin) => {
    return jwt.sign({id , isAdmin} , process.env.JWT_SECRET , {expiresIn  : maxAge});
}

export const post_login = async (req , res) => {
    
    const {email , password} = req.body;
    const isAdminPath = req.originalUrl === '/admin/login';

    try{

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({error : true , msg : 'Invalid Email'})
        }

        if(user.isDeleted){
            return res.status(401).json({error : true , msg : 'Email is Not Valid Anymore'})
        }

        const isMatch = await user.comparePassword(password);


        if(!isMatch){
            return res.status(401).json({error : true , msg : 'Incorrect password'})
        }

        const isAdmin = user.email === process.env.ADMIN_EMAIL;


        if(isAdminPath && !isAdmin){
            return res.status(401).json({error : true , msg : 'Your are not an admin'})
        }

        const token = createToken(user._id , isAdmin);

        res.cookie('jwt' , token ,
            {   httpOnly : true , 
                maxAge : maxAge * 1000,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
            } );

        res.json({success : true , msg : user})

    }catch(err){
        console.log(err);
        res.json({error : err.message});
    }
    
}


export const post_signUp = async (req , res) => {

    const {email , username , password} = req.body;

    try{


        if(password.length <= 6){
            return res.status(403).json({error : true , msg : "password must be greater han 6 character"})
        }

        const user = await User.create({email , username , password , isDeleted : false});

        res.json({success : true , msg : 'Successfully Add User'});


    }catch(err){
        console.log(err);

        if(err.code === 11000){
            return res.status(400).json({error : true , msg : 'Email Already Exist'})
        }

        res.status(500).json({error : err});
    }
}

export const delete_user = (req , res) => {
    res.cookie('jwt' , '' , {maxAge: 1});
    res.json({success : true , msg : "Succesfully delete user"});
}