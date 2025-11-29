import mongoose from "mongoose";
import keySchema from "./keySchema.js";


const activeKey = mongoose.model('activeKey' , keySchema);
export default activeKey;