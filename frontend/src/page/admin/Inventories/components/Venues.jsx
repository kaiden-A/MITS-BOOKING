import { useState , useMemo  } from "react";
import BookingModal from "./BookingModal";
import Notifications from '../../../global/Success';
function Venues({venues , setVenues}){

    const [searchPrompt , setSearchPrompt] = useState("");
    const [open , setOpen] = useState(false);
    const [currentData , setCurrentData] = useState({});
    const [success , setSuccess] = useState(false);

    const searchArray = useMemo(() => {

        let array = [...venues];

    
        array = array.filter(v => v.name.toLowerCase().includes(searchPrompt.toLowerCase()))
        

        return array;

    } , [venues , searchPrompt])


    const updateStatus = async ( id ,disable) => {

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/admin/venues/${id}` , {
                method : 'PUT',
                credentials : 'include',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({active :  disable})
            })

            const data = await responses.json();


            if(data.success){

                setVenues(v =>
                    v.map(venue => venue._id === id ? {...venue , active : disable} : venue)
                )
            }

        }catch(err){
            console.log(err);
        }
    }

    return(

        <>
            {
                success && 
                <Notifications
                    open={open} 
                    onClose={() => setOpen(false)}  
                    success={true}
                    message={'Successfully Book The Venue'}
                />
            
            }
            {   
            
                open && 
                
                <BookingModal 
                    setOpen={setOpen} 
                    venues={currentData}
                    setSuccess={setSuccess}
                />
            }
             <div className="form">
                <input className="input-inventory" type="text" name="name" placeholder="Enter a venue" 
                    onChange={(e) => setSearchPrompt(e.target.value) }
                />
                <button className="btn-inventory">SEARCH</button>
            </div>  

            <div className="grid">

                {
                    searchArray.length > 0 ? (

                        searchArray.map((venue) => 

                            <div key={venue._id} className="card" 
                                onClick={() =>{
                                    setCurrentData(venue); 
                                    setOpen(true)
                                }}
                            
                            >

                                <div className="head-card">
                                    <h2>{venue.name}</h2>

                                    {
                                        venue.active ? (
                                            <p>Status : <span className="active">Active</span></p>
                                        ) : (
                                            <p>Status : <span className="disable">Disable</span></p>
                                        )
                                    }

                                </div>
                                <div className="location-capacity"> 
                                    <p className="location">{`Location : ${venue.location}`}</p>
                                    <p className="capacity">{`Capacity : ${venue.capacity}`}</p>
                                </div>
                                <div className="all-button">
                                    <button className="disable-btn" 
                                        onClick={() => updateStatus(venue._id , false)}
                                    >DISABLED
                                    </button>
                                    <button className="active-btn"
                                        onClick={() => updateStatus(venue._id , true)}
                                    >ACTIVATE
                                    </button>
                                </div>

                            </div>

                        )
                    
                    ) : (
                        <p>No Venues Available</p>
                    )
                }
                
            </div>      
        </>
    )
}

export default Venues;