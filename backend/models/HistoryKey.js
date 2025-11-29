import mongoose from "mongoose";
import keySchema from "./keySchema.js";

const historyKey = mongoose.model('historyKey' , keySchema);
export default historyKey;