import Venue from "../models/venue.js";
import reserveVenue from "../models/reserveVenue.js";
import HistoryReserve from '../models/historyReserve.js';
import activeKey from "../models/ActiveKey.js";
import historyKey from '../models/HistoryKey.js';
import User from '../models/users.js';
import News from "../models/News.js";
import formatTime from "../utils/formatTime.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { timeSlot } from "./timeSlot.js";

export const get_homepage = catchAsync( async (req , res) => {
    const venues = await Venue.find();

    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Active = Today reservations
    const reserve = await reserveVenue.find({
        date: { $gte: today, $lt: tomorrow }
    })
    .populate('venueId', 'name active') // get name + status
    .populate('userId', 'username email');  // get name + email

    // Past = Yesterday reservations
    const history = await HistoryReserve.find({
        date: { $gte: yesterday, $lt: today }
    })
    .populate('venueId', 'name active')
    .populate('userId', 'username email');

    const users = await User.find({isDeleted : false , email: { $ne: process.env.ADMIN_EMAIL }});
    const news = await News.find({category : 'booking'});

    res.json( {
        venues,
        reserve,
        history,
        users,
        news
    });
})




export const post_venue = catchAsync(async (req , res) => {


    const {name , location , capacity , active} = req.body;

    const venue = await Venue.create({name , location , capacity , active});
    
    if(!venue){
        throw new AppError('Fail Creating The Venue' , 403);
    }

    const storeKey = await activeKey.create({venueId : venue._id});

    if(!storeKey){
        throw new AppError('Fail Store The Key' , 403);
    }

    res.json({success : true , msg : "Successfully Add the Venue"});


})

export const update_status_venues = catchAsync( async (req , res) => {

    const venueId = req.params.id;
    const {active} = req.body;

    

    const updatedDocument = await Venue.findByIdAndUpdate(venueId , {active : active} , {new : true});

    if(!updatedDocument){
       throw new AppError('Fail Updating The Venue Status' , 400);
    }

    res.json({success : true , msg : "venue being updated" ,data: updatedDocument})

})

export const get_past_reservations = catchAsync(async (req , res) => {

    

    const history = await HistoryReserve.find().populate('userId' , 'username email').populate('venueId' , "name")

    const result = history.map(venue => {

        const date = new Date(venue.date);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const customDateString = date.toLocaleDateString('en-GB', options); // "23 September 2025"

        

        return {

            name : venue.venueId.name,
            date : customDateString,
            slot : formatTime(venue.slot),
            username : venue.userId.username,
            reason : venue.reason

        }
    })

    res.json({ venues : result , noData : 'no past data'});

})

export const get_active_reservations = catchAsync(async (req , res) => {

    const reserve = await reserveVenue.find().sort({date : -1}).populate('userId' , 'username').populate('venueId' , 'name');

    const result = reserve.map( venue => {

        const date = new Date(venue.date);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const customDateString = date.toLocaleDateString('en-GB', options); // "23 September 2025"

        return {

            name : venue.venueId.name,
            date : customDateString,
            slot : formatTime(venue.slot),
            username : venue.userId.username,
            reason : venue.reason

        }
    })

    res.json({ venues : result, noData : 'no active data' });



})

export const get_venue_inventory = catchAsync(async (req , res) => {

    const venue = await Venue.find();
    res.json({venues : venue})
})


export const post_news = catchAsync( async (req , res) => {

    const {title , description , category} = req.body;

    const news = await News.create({title , description , category});

    if(!news){
        throw new AppError('Fail Creating The News' , 400);
    }

    res.json({success : true , data : news , msg : "Successfully Create News"});

})

export const delete_news = catchAsync(async (req , res) => {

    const newsId = req.params.id;
    
    
    const news = await News.findByIdAndDelete(newsId);

    if(!news){
        throw new AppError('Fail Deleting The News' , 400);
    }

    res.json({success : true , data : news , msg : "Successfully delete news"});

})

export const get_keys = catchAsync( async (req , res) =>{


    const totalKeys = await activeKey.countDocuments();
    const totalAvail = await activeKey.countDocuments({keyStatus : "available"});
    const keyTaken = await activeKey.countDocuments({keyStatus : "active"});

    const keys = await activeKey.find()
                    .select("_id venueId userId keyStatus takeTime")
                    .populate("venueId" , "name").populate("userId" , "username");
    if(!keys){
        throw new AppError('Fail To Retrieve The Key' , 400);
    }

        const hist = await historyKey.find()
                    .select("keyStatus takeTime returnTime")
                    .populate("venueId", "name")
                    .populate("userId", "username")
                    .lean();

        const result = hist.map(h => ({
            ...h,
            name: h.venueId?.name,
            username: h.userId?.username,
            venueId: undefined,
            userId: undefined
        }));



    res.json({active : keys , past : result , totalAvail , totalKeys , totalTaken : keyTaken})

})

export const delete_user_status = catchAsync(async(req , res) => {

    const userId = req.params.id;

    const dltUser = await User.findByIdAndUpdate(userId , {isDeleted : true} , {new : true});

    if(!dltUser){
        throw new AppError('Fail Deleting The user' , 400);
    }

    res.status(201).json({success : true , msg : 'Successfully deleted the user'});

    
})

export const delete_reserve = catchAsync(async (req , res) => {

    const reserveId = req.params.reserveId;


    const deletedVenue = await reserveVenue.findByIdAndDelete(reserveId);

    if(!deletedVenue){
        throw new AppError('Unsuccessfully Delete The Reservation' , 400);
    }

    res.json({success : true , msg : "Sucessfully deleted the reserve venue"})


})

export const get_user = catchAsync(async(req , res) => {

    const users = await User.find({isDeleted : false});

    res.status(200).json({users : users});

})


export const mass_booking = catchAsync (async(req , res) => {

    
    const {venuePic , venueId , reason , dateBegin , dateEnd} = req.body;

    const startDate = new Date(dateBegin);
    const endDate = new Date(dateEnd);

    if(endDate < startDate){
        throw new AppError('Begin Date must be before End Date' , 400);
    }

    //delete booking first
    await reserveVenue.deleteMany({
        venueId: venueId,
        date: { $gte: startDate, $lte: endDate },
        slot: { $in: timeSlot } 
    })

    const bookings = [];

    for(let d = new Date(startDate) ; d <= endDate ; d.setDate(d.getDate() + 1)){

        const currentDate = new Date(d);

        for(let time of timeSlot){
            bookings.push({
                userId : venuePic,
                venueId : venueId,
                date : currentDate,
                slot : time,
                reason : reason
            })
        }
    }
    
    //add all booking
    await reserveVenue.insertMany(bookings);
    res.status(201).json({success : true , message : "Successfully Book Venue"})
    

})
