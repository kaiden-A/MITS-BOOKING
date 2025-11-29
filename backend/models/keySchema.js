import mongoose from "mongoose";


const keySchema = mongoose.Schema({

    venueId : {
        type: mongoose.Schema.Types.ObjectId, ref: 'venue',
        required: true
    },

    userId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' ,
        default: null
    },

    keyStatus: {
        type: String,
        enum: ['available', 'active', 'returned'],
        default: 'available'
    },


    takeTime : {
        type : Date,
    },

    returnTime : {
        type: Date,
    }
} , {timestamps : true})

export default keySchema;