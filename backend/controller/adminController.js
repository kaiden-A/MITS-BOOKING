import Venue from "../models/venue.js";
import reserveVenue from "../models/reserveVenue.js";
import HistoryReserve from '../models/historyReserve.js';
import activeKey from "../models/ActiveKey.js";
import historyKey from '../models/HistoryKey.js';
import venue from "../models/venue.js";
import User from '../models/users.js';
import News from "../models/News.js";

export const get_homepage = async (req , res) => {
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

    const users = await User.find({}, 'username email'); // only return name+email
    const news = await News.find({category : 'booking'});

    res.json( {
        venues,
        reserve,
        history,
        users,
        news
    });
};




export const post_venue = async (req , res) => {
    
    try{

        const {name , location , capacity , active} = req.body;

        const venue = await Venue.create({name , location , capacity , active});
        
        if(!venue){
            return res.status(403).json({error : true , msg : "Fail Create The Venue"})
        }

        const storeKey = await activeKey.create({venueId : venue._id});

        if(!storeKey){
            return res.status(403).json({error : true , msg : "Fail to Store The Key"})
        }

        res.json({success : true , msg : "Successfully Add the Venue"});

    }catch(err){
        console.log(err);
        res.json({error : true , msg : err});
    }

}

export const update_status_venues = async (req , res) => {

    const venueId = req.params.id;
    const {active} = req.body;

    try{

        const updatedDocument = await Venue.findByIdAndUpdate(venueId , {active : active} , {new : true});

        if(!updatedDocument){
            return res.status(404).json({error : true , msg : "Updating The venue status has fail"})
        }

        res.json({success : true , msg : "venue being updated" ,data: updatedDocument})
    }catch(err){
        console.log(err);
    }
}

export const get_past_reservations =  async (req , res) => {

    try{

        const history = await HistoryReserve.find().populate('userId' , 'username email').populate('venueId' , "name")

        const result = history.map(venue => {

            const date = new Date(venue.date);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const customDateString = date.toLocaleDateString('en-GB', options); // "23 September 2025"


            return {

                name : venue.venueId.name,
                date : customDateString,
                slot : venue.slot,
                username : venue.userId.username,
                reason : venue.reason

            }
        })

        res.json({ venues : result , noData : 'no past data'});

    }catch(err){

        console.log(err);
    }

}

export const get_active_reservations = async (req , res) => {


        
    try{

        const reserve = await reserveVenue.find().sort({date : -1}).populate('userId' , 'username').populate('venueId' , 'name');

        const result = reserve.map( venue => {

            const date = new Date(venue.date);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const customDateString = date.toLocaleDateString('en-GB', options); // "23 September 2025"

            return {

                name : venue.venueId.name,
                date : customDateString,
                slot : venue.slot,
                username : venue.userId.username,
                reason : venue.reason

            }
        })

        res.json({ venues : result, noData : 'no active data' });

    }catch(err){
        console.log(err);
    }

}

export const get_venue_inventory = async (req , res) => {

    const venue = await Venue.find();


    res.json({venues : venue})
}


export const post_news = async (req , res) => {

    const {title , description , category} = req.body;

    try{

        const news = await News.create({title , description , category});

        if(!news){
            return res.json({error : true , msg : 'UNCESSEFULLY CREATE NEWS'})
        }

        res.json({success : true , data : news , msg : "Successfully Create News"});

    }catch(err){

        console.log(err);
    }
}

export const delete_news = async (req , res) => {

    const newsId = req.params.id;
    
    try{
        const news = await News.findByIdAndDelete(newsId);

        if(!news){
            return res.json({error: true , msg : 'Fail to delete news'})
        }

        res.json({success : true , data : news , msg : "Successfully delete news"});

    }catch(err){
        console.log(err);

        res.status(500).json({error : true , msg : 'SERVER ERROR'})
    }
}

export const get_keys = async (req , res) =>{

    try{

        const totalKeys = await activeKey.countDocuments();
        const totalAvail = await activeKey.countDocuments({keyStatus : "available"});
        const keyTaken = await activeKey.countDocuments({keyStatus : "active"});

        const keys = await activeKey.find()
                        .select("_id venueId userId keyStatus takeTime")
                        .populate("venueId" , "name").populate("userId" , "username");
        if(!keys){
            return res.status(401).json({error : true , msg : 'Fail To Retrieve Key'});
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

    }catch(err){
        console.log(err);
    }
}
