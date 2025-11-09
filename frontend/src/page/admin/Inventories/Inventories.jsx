import { useEffect , useState} from "react";

import Venues from "./components/Venues";
import './styles/Inventories.css'
function Inventories(){

    const [venues , setVenues] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            try{
                
                const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/admin/venues/inventories` , {
                    credentials : 'include'
                })

                const data = await responses.json();
                setVenues(data.venues);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();

    } , [])

    return(
        <div className="mother">
            <title>Venue Inventory</title>
            <div className="content">

                <div className="header">
                    <h1>Venue Inventory</h1>
                </div>
                <div className="card-content">
                    <Venues
                        venues={venues}
                        setVenues={setVenues}
                    />
                </div>

            </div>
        </div>
    )

}

export default Inventories;