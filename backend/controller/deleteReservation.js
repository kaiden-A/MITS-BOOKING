import nodeCron from "node-cron";
import ReserveVenue from "../models/reserveVenue.js";
import History from "../models/historyReserve.js";

export default function startCronFunction(){

    nodeCron.schedule("9 0 * * *", async () => {

        try {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(23, 59, 59, 999);

            const expired = await ReserveVenue
                .find({ date: { $lte: yesterday } })
                .lean();
            

            console.log("Expired Count: " , expired.length);

            if(expired.length === 0) return;

            const historyDocs = expired.map(({ _id, ...rest }) => rest);

            if (historyDocs.length > 0) {
                const result = await History.insertMany(historyDocs);
                if (result.length === historyDocs.length) {
                    await ReserveVenue.deleteMany({ date: { $lte: yesterday } });
                }
            }

            console.log("Reservations moved to history");

        } catch (err) {
            console.error("Error clearing reservations:", err);
        }
    } ,  { timezone: "Asia/Kuala_Lumpur" });
}



