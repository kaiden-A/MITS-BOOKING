import { useState , useEffect } from "react";
import CardContent from "./components/CardContent";

import './styles/Reservation.css'

function Reservations({active}){

    const [venues , setVenues] = useState([]);


    useEffect(() => {

        const fetchData = async () => {

            try{

                const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/admin/${active ? 'active' : 'past'}/reservations` , {
                    method : 'GET',
                    credentials : 'include'
                })

                const data = await responses.json();
                console.log(data.venues);
                setVenues(data.venues)

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    } , [ active])

    return(
        <>
        <div className="mother">
            <div className="content">

                <header>
                    <p>{`${active ? 'Active Reservations Data' : 'Past Reservations Data'}`}</p>
                </header>

            </div>
            <CardContent
                venues={venues}
                setVenues={setVenues}
            />
        </div>
        </>
    )
}

export default Reservations;