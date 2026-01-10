import { useEffect, useState } from 'react';
import './styles/ReservationForm.css'
import Success from '../../global/Success';

function ReservationForm(){

    const [time , setTime] = useState([]);
    const [venues , setVenues] = useState([]);

    const [selectedTime , setSelectedTime] = useState(Array(time.length).fill(false));

    const [reserveTime , setReserveTime] = useState([]);
    const [reserveVenue , setReserveVenue] = useState("");
    const [reserveDate , setReserveDate] = useState("");
    const [reserveReason , setReserveReason] = useState("");

    const [success , setSuccess] = useState(false);
    const [err , setErr] = useState(false);
    const [msg , setMsg] = useState("");
    const [isSubmit , setIsSubmit] = useState(false);

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
    }, [])

    useEffect(() => {
        setSelectedTime(Array(time.length).fill(false));
    }, [time]);

    useEffect(() => {

         if (!reserveDate || !reserveVenue) return;
        const searchTime = async () => {

            try{

                const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/availability?venueId=${reserveVenue}&date=${reserveDate}`);
                const data = await responses.json();

                setTime(data.availableSlot)

            }catch(err){
                console.log(err);
            }
        }

        searchTime();

    } , [reserveDate , reserveVenue])

    const toggleDivs = (index) => {

        setSelectedTime(s => s.map((isActive , i) => i === index ? !isActive : isActive));

        setReserveTime(r => {
            if(r.includes(time[index])){
                return r.filter((t) => t !== time[index])

            }else{
                return [...r , time[index]]
            }
        })
    }

    const resetForm = () => {
        setTime([]);
        setReserveVenue("");
        setReserveDate("");
        setReserveTime("");
        setReserveReason("");
    }

    const handleForm = async (e) => {

        setIsSubmit(true);
        e.preventDefault();

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/reservations` , {
                method : 'POST',
                credentials : 'include',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    venueId : reserveVenue,
                    date : reserveDate,
                    slots : reserveTime,
                    reason : reserveReason
                })
            })

            const data = await responses.json();
            

            if(data.success){
                setErr(false)
                setMsg(data.msg)
                setSuccess(true);
                resetForm();
            }

            if(data.error){
                setSuccess(false);
                setMsg(data.msg);
                setErr(true);
                resetForm();
            }

        }catch(err){
            console.log(err);
        }finally{
            setIsSubmit(false);
        }

    }

    return(
        <>
            <Success
                open={success}
                message={msg}
                success={true}
                onClose={() => setSuccess(false)}
            />
            <Success
                open={err}
                message={msg}
                success={false}
                onClose={() => setErr(false)}
            />
            <title>Reserve Venue Form</title>
            <main className="main-content" >
                <div className="form-header">
                    <h1 className="form-title">Create A Schedule</h1>
                    <button className="create-new-btn" onClick={() => resetForm()}>
                        <i className="fas fa-plus-circle"></i>
                        Create New Schedule
                    </button>
                </div>

                <div className="schedule-form">
                    <form onSubmit={handleForm}>
                        <div className="form-group">
                            <label htmlFor="venue" className="form-label">VENUE</label>
                            <select  
                                value={reserveVenue}
                                className="form-control form-select" required
                                onChange={(e) => setReserveVenue(e.target.value) }
                            >
                                <option value=""> --Choose a Venue--</option>
                                {
                                    venues.map((venue , i) => 
                                        <option key={i} value={venue?._id}>{venue?.name}</option>
                                    )
                                }
                            </select>
                            <div className="error-message">Please select a venue</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="date" className="form-label">DATE</label>
                            <input type="date" 
                                value={reserveDate}
                                onChange={(e) => setReserveDate(e.target.value)}
                                className="form-control" required
                            />
                            <div className="error-message">Please select a date</div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">TIME SLOTS</label>
                            <div className="time-slots-container" id="timeSlotsContainer">
                                {
                                    time.length > 0 ? (
                                        time.map((t , i)=> 
                                            <div 
                                                className={`time-slot ${selectedTime[i] ? "selected" : ""}`} 
                                                key={i} onClick={() => toggleDivs(i)}
                                            >
                                                {t}
                                            </div>
                                        )
                                    ) : (<div className="error-message">
                                            Please choose a venue and the date
                                        </div>
                                        )
                                }
                            </div>
                            <input type="hidden" name="selectedTimes" id="selectedTimes" required/>
                            <div className="error-message" id="timeError">Please select at least one time slot</div>
                            
                            <div className="selected-slots-info">
                                <div>Selected time slots:</div>
                                <div className="selected-slots-list" id="selectedSlotsList">
                                    {
                                        reserveTime.length > 0 ? (
                                            reserveTime.map((time , i )=> 
                                                <span key={i} className='selected-slot-tag'>{time}</span>
                                            )
                                        ) : (<span className='selected-slot-tag'>No Slots Selected</span>)
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="reason" className="form-label">REASON</label>
                            <input type="text" 
                                className="form-control" 
                                placeholder="Enter a reason for booking" required
                                value={reserveReason}
                                onChange={(e) => setReserveReason(e.target.value)}
                            />
                            <div className="error-message">Please provide a reason for booking</div>
                        </div>

                        <hr className="form-divider"/>

                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={isSubmit}
                            style={{backgroundColor : isSubmit ? "#6fdc8c"  : "#2da44a" , cursor: isSubmit ? "not-allowed" : "pointer"}}
                        >
                            <i className="fas fa-paper-plane"></i>
                            SUBMIT SCHEDULE
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default ReservationForm;