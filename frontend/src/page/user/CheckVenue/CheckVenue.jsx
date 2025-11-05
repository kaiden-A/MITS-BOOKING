import './styles/CheckVenue.css'
import EmptyState from './components/emptyState';
import Slot from './components/Slot';
import { useEffect, useState } from 'react';

function CheckVenue (){

    const [slot , setSlot] = useState([]);
    const [venues , setVenues] = useState([]);

    const [date , setDate] = useState("");
    const [checkVenue , setCheckVenue] = useState("")

    useEffect(() => {

        const fetchData = async () => {
            
            try{
                
                const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/reservations` , {
                    credentials : 'include'
                });

                const data = await responses.json();
                setVenues(data.venues)

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);



    const searchVenue = async (e) => {

        e.preventDefault();

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/check?venueId=${checkVenue}&date=${date}`);
            const data = await responses.json();

            setSlot(data.mappedSlot);

        }catch(err){
            console.log(err);
        }
    }


    return(
            <main className="main-content">
            <div className="page-header">
                <h1 className="page-title">Check Reservations</h1>
                <hr className="page-divider"/>
            </div>

            <form className="search-form" 
                style={{background: "var(--bg-card)",borderRadius: "var(--radius)",padding: "30px",boxShadow: "var(--shadow)",marginBottom: "40px"}}
                onSubmit={searchVenue}                
            >
                <div className="form-group" style={{display: "flex",gap: "20px",alignItems: "flex-end",flexWrap: "wrap"}}>
                    <div className="form-field" style={{ flex: "1",minWidth: "200px"}}>
                        <label htmlFor="date" className="form-label" style={{display: "block",marginBottom: "8px",fontWeight: "600",color: "var(--text-dark)",fontSize: "15px"}}>Search for a date</label>
                        <input type="date" 
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            className="form-control" 
                            required
                        />
                    </div>
                    
                    <div className="form-field" style={{ flex: "1",minWidth: "200px"}}>
                        <label htmlFor="venue" className="form-label" style={{display: "block",marginBottom: "8px",fontWeight: "600",color: "var(--text-dark)",fontSize: "15px"}}>Venue</label>
                        <select className="form-control form-select" required 
                            onChange={(e) => setCheckVenue(e.target.value)}
                            value={checkVenue}
                        >
                            <option value="" >-- Choose a Venue --</option>
                                {
                                    venues.map((venue , i) => 
                                        <option key={i} value={venue?._id}>{venue?.name}</option>
                                    )
                                } 
                        </select>
                    </div>
                    
                    <button type="submit" className="search-btn">
                        <i className="fas fa-search"></i>
                        SEARCH
                    </button>
                </div>
            </form>

            <div className="results-header" id="resultsHeader" style={{display: "none"}}>
                <h2 className="venue-name" id="venueName">Venue Name</h2>
                <div className="selected-date" id="selectedDate">Selected Date</div>
            </div>

            <div className="time-slots-grid" id="timeSlotsGrid">

                {
                    slot.length > 0 ? (
                        
                        slot.map((s , i) => 
                            <Slot 
                                key={i}
                                time={s.time} 
                                user={s?.occupied?.userId?.username} 
                                occupied={s?.occupied !== null ? true : false} 
                            />
                        )
                    ) : (
                        <EmptyState/>
                    )
                }

            </div>
        </main>

    )
}

export default CheckVenue;