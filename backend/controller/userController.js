import reserveVenue from "../models/reserveVenue.js";
import User from '../models/users.js';
import Venue from '../models/venue.js';
import { timeSlot } from "./timeSlot.js";
import activeKey from "../models/ActiveKey.js";
import historyKey from "../models/HistoryKey.js";
import formatTime from "../utils/formatTime.js";

export const get_homepage = async (req , res) => {


    try{
        const currentUser = req.user;

        const user = await User.findById(currentUser._id);

        const userReserveVenue = await reserveVenue.find({userId : currentUser._id}).populate("venueId" , "name");

        const result = userReserveVenue.map(reserve => {

            return{
                reserveId : reserve._id,
                venueId : reserve.venueId._id,
                date : reserve.date,
                name : reserve.venueId.name,
                slot : formatTime(reserve.slot),
                reason : reserve.reason
            }

        })

        res.json({success : true , cookies : true , reserve : result , user});                      
       
        
    }catch(err){
        console.log(err);
    }

}

export const get_reserve_form = async (req , res) => {


    try{

        const currentUser = req.user;
        const user = await User.findById(currentUser._id);


        const venue = await Venue.find({active : true});

        res.json({venues: venue , user})

    }catch(err){

        console.log(err);
    }
    
}

export const post_reserve = async (req , res) => {

    

    try{

        const userId = req.user._id;
        const { venueId , date, slots , reason} = req.body;
        const reservations = slots.map(slot => ({userId , venueId , date, slot , reason}))

        const reserve = await reserveVenue.insertMany(reservations);

        res.json({success: true , msg : "Successfuly reserve venue"});
        
    }catch(err){
        console.log(err);

        if(err.code === 11000){

            const match = err.message.match(/slot: "([^"]+)"/);
            const slot = match ? match[1] : "unknown";


            return res.status(403).json({error : true , msg : `This Booking slot ${slot} is Already taken`})
        }

        res.status(500).json({error : "Server Error"});
    }



}

export const delete_reserve = async (req , res) => {

    const reserveId = req.params.reserveId;

    try{

        const deletedVenue = await reserveVenue.findByIdAndDelete(reserveId);

        if(!deletedVenue){
            return res.status(403).json({error : true , msg : "Unsuceessfully Deleting the reservation"})
        }

        res.json({success : true , msg : "Sucessfully deleted the reserve venue"})



    }catch(err){
        console.log(err);

        res.status(500).json({error : true , msg : "Server Error"});
    }

}

export const reserve_key = async(req , res) =>{

    const venueId = req.params.id;
    const user = req.user;

    try{

        const key = await activeKey.findOne({venueId : venueId});
        if(!key){
            return res.status(401).json({error : true , msg : "Key Doesn't Exist"})
        }

        if(key.keyStatus === "active"){
            const user = await User.findById(key.userId);
            return res.status(401).json({error : true , msg : `${user?.username} doesn't return the key yet`})
        }

        key.keyStatus = "active";
        key.userId = user._id;
        key.takeTime = new Date();

        await key.save();

        res.json({success : true , msg : "Successfully Take The Key"})

    }catch(err){
        console.log(err);
        res.status(500).json({error : true , msg : "Server Error"})

    }

}

export const return_key = async(req , res) => {

    const venueId = req.params.id;

    try{

        const key = await activeKey.findOne({venueId : venueId});

        if(!key){
            return res.status(403).json({error : true , msg : "Key Doesnt Exist"});
        }

        if(key.keyStatus !== "active"){
            return res.status(403).json({error : true , msg : "Key must be reserved first"})
        }

        key.returnTime = new Date();
        await key.save();

        const storeKey = await historyKey.create({
            venueId : key.venueId,
            userId : key.userId,
            keyStatus : "returned",
            takeTime : key.takeTime,
            returnTime : key.returnTime
        });

        key.keyStatus = "available";
        key.userId = null;
        key.takeTime = null;
        key.returnTime = null;

        await key.save();

        return res.json({success : true , msg : "Successfully return the key"})


    }catch(err){
        console.log(err)
    }

}


export const get_user_profile = async (req , res) => {

    const user = req.user;

    try{
        const currentUser = await User.findById(user._id);

        res.json({user : currentUser});

    }catch(err){

        console.log(err);
    }
}

export const post_change_password = async (req , res) => {

    const currentUser = req.user;
    const {oldPassword , newPassword} = req.body;

    try{

        const user = await User.findById(currentUser._id);

        const isMatch = await user.comparePassword(oldPassword);

        if(!isMatch){
            return res.status(403).json({error : true , msg : 'Wrong password !!'})
        }

        if(newPassword.length <= 6){
            return res.status(403).json({error : true , msg : 'Password must be atleast 6 character'})
        }

        user.password = newPassword;
        await user.save()

        res.json({success : true , msg: 'successfully change a password'});


    }catch(err){

        console.log(err);
        res.json({error : true , msg : err});
    }
}
