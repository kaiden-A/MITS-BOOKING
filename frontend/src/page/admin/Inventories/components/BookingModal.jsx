import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import Form from "./Form";

function BookingModal({setOpen , venues , setSuccess}){

    const [users , setUsers] = useState([]);
    const [pic , setPic] = useState("");
    const [reason , setReason] = useState("");
    const [start , setStart]  = useState("");
    const [end , setEnd] = useState("");
    
    useEffect(() => {
        console.log(users);
    }, [users])

    useEffect(() => {

        const fetchUser = async () => {

            try{

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/admin/users` , {withCredentials : true} );
                setUsers(res.data.users);

            }catch(err){
                console.error(err.message);
            }

        }

        fetchUser();

    }, [])

    const submitForm  = async (e) => {
        
        e.preventDefault();

        try{

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/admin/bookings`,
                {venuePic : pic , venueId : venues._id , reason  , dateBegin : start, dateEnd : end},
                {withCredentials : true}
            )

            if(res.data.success){
                setSuccess(true);
                setOpen(false);

            }

        }catch(err){
            console.error(err.message);
        }
    }

    return(

     <Form 
        onClose={() => setOpen(false)} 
        venue={venues} 
        users={users}
        pic={pic}
        setPic={setPic}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        reason={reason}
        setReason={setReason}
        submit={submitForm}
    />
    )

}

export default BookingModal;