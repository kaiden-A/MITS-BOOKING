

function Form({onClose  , submit, venue , users , pic , setPic , start , setStart , end , setEnd , reason , setReason}){

    return(

        <div className="modal-overlay active" id="bookingModal" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            opacity: 1,
            transition: 'opacity 0.3s ease',
            padding: '20px'
        }}>
            <div className="modal-container" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(0)',
                transition: 'transform 0.3s ease'
            }}>
                
                {/* Modal Header */}
                <div className="modal-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px 30px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    background: 'linear-gradient(135deg, #904099, #7a2f87)',
                    borderRadius: '16px 16px 0 0',
                    color: 'white'
                }}>
                    <div className="modal-title" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '20px',
                        fontWeight: 700
                    }}>
                        <i className="fas fa-calendar-check" style={{fontSize: '22px'}}></i>
                        Book Venue
                    </div>
                    <button className="modal-close" onClick={onClose} style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="modal-body" style={{padding: '30px'}}>
                    
                    {/* Booking Type Header */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '30px',
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #904099, #7a2f87)',
                        borderRadius: '10px',
                        color: 'white'
                    }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}>
                            <i className="fas fa-desktop"></i>
                            {`Booking For ${venue.name} `}
                        </h3>
                    </div>
                    
                    {/* Booking Form */}
                    <form className="booking-form" onSubmit={submit}>
                        
                        {/* Booking Type */}
                        <div className="form-group" style={{marginBottom: '24px'}}>
                            <label className="form-label" style={{
                                marginBottom: '8px',
                                fontWeight: 600,
                                color: '#1f2937',
                                fontSize: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <i className="fas fa-tag" style={{color: '#7a2f87', fontSize: '14px'}}></i>
                                Booking Type
                            </label>
                            <input type="text" className="form-control" id="bookingType" value={venue.name} readOnly style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '15px',
                                background: '#f9fafb',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                outline: 'none',
                                cursor: 'not-allowed'
                            }}/>
                        </div>

                        {/* Person in Charge */}
                        <div className="form-group" style={{marginBottom: '24px'}}>
                            <label className="form-label" style={{
                                marginBottom: '8px',
                                fontWeight: 600,
                                color: '#1f2937',
                                fontSize: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <i className="fas fa-user-check" style={{color: '#7a2f87', fontSize: '14px'}}></i>
                                Person in Charge
                            </label>
                            <select
                                value={pic}
                                onChange={(e) => setPic(e.target.value)} 
                                className="form-control form-select" id="personInCharge" required style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '15px',
                                background: 'white',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                outline: 'none',
                                appearance: 'none',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 16px center',
                                backgroundSize: '16px',
                                cursor: 'pointer'
                            }}>
                                <option value="">-- Select Person in Charge --</option>
                                {
                                    users.map(u => 
                                        <option key={u._id} value={u._id}>{u.username}</option>
                                    )
                                }
                            </select>
                        </div>

                        {/* Date Range */}
                        <div className="date-range-group" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '16px',
                            marginBottom: '24px'
                        }}>
                            <div className="form-group">
                                <label className="form-label" style={{
                                    marginBottom: '8px',
                                    fontWeight: 600,
                                    color: '#1f2937',
                                    fontSize: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <i className="fas fa-calendar-plus" style={{color: '#7a2f87', fontSize: '14px'}}></i>
                                    Start Date
                                </label>
                                <div className="date-input-wrapper" style={{position: 'relative'}}>
                                    <input
                                        value={start}
                                        onChange={(e) => setStart(e.target.value)} 
                                        type="date" className="form-control" id="startDate" required style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        paddingRight: '40px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '15px',
                                        background: 'white',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        outline: 'none'
                                    }}/>
                                    <i className="fas fa-calendar-alt date-icon" style={{
                                        position: 'absolute',
                                        right: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#6b7280',
                                        pointerEvents: 'none'
                                    }}></i>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" style={{
                                    marginBottom: '8px',
                                    fontWeight: 600,
                                    color: '#1f2937',
                                    fontSize: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <i className="fas fa-calendar-minus" style={{color: '#7a2f87', fontSize: '14px'}}></i>
                                    End Date
                                </label>
                                <div className="date-input-wrapper" style={{position: 'relative'}}>
                                    <input
                                        value={end}
                                        onChange={(e) => setEnd(e.target.value)} 
                                        type="date" className="form-control" id="endDate" required style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        paddingRight: '40px',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        fontSize: '15px',
                                        background: 'white',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        outline: 'none'
                                    }}/>
                                    <i className="fas fa-calendar-alt date-icon" style={{
                                        position: 'absolute',
                                        right: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#6b7280',
                                        pointerEvents: 'none'
                                    }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="form-group" style={{marginBottom: '24px'}}>
                            <label className="form-label" style={{
                                marginBottom: '8px',
                                fontWeight: 600,
                                color: '#1f2937',
                                fontSize: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <i className="fas fa-sticky-note" style={{color: '#7a2f87', fontSize: '14px'}}></i>
                                Reason
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)} 
                                className="form-control" id="notes" rows="3" placeholder="Any additional information or special requirements..." style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '15px',
                                background: 'white',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                outline: 'none',
                                resize: 'vertical',
                                minHeight: '80px'
                            }}></textarea>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="submit-btn" id="submitBtn" style={{
                            background: 'linear-gradient(135deg, #904099, #7a2f87)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px 32px',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                            width: '100%',
                            marginTop: '10px'
                        }}>
                            <i className="fas fa-paper-plane"></i>
                            CONFIRM BOOKING
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;