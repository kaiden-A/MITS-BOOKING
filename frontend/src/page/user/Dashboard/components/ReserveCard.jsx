

function ReserveCard({venue , date , time , handleDelete , handleEdit , handleActivation , isSubmit}){

    

    return(
        <>
            <div className="schedule-card" onDoubleClick={handleActivation}>
                <div className="card-header">
                    <div>
                        <h3 className="card-title">{venue}</h3>
                    </div>
                    <button className="card-btn reschedule-btn" onClick={handleEdit}>
                        <i className="fas fa-edit"></i>
                        RESCHEDULE
                    </button>
                </div>
                <div className="card-content">
                    <div className="schedule-info">
                        <p className="schedule-date">{formatDate(date)}</p>
                        <p className="schedule-time">{time}</p>
                    </div>
                </div>
                <div className="card-footer">
                    <div></div>
                    <div className="card-actions">
                        <button 
                            className="card-btn delete-btn" 
                            onClick={handleDelete}
                            disabled={isSubmit}
                            style={{backgroundColor : isSubmit ? "#cf222e" : "#d64852ff" , cursor: isSubmit ? "not-allowed" : "pointer"}}
                        >
                            <i className="fas fa-trash"></i>
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}

function formatDate(dateString) {
    const date = new Date(dateString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function addOneHourRange(timeStr) {
    // Split hours and minutes
    const [hourStr, minuteStr] = timeStr.split(':');
    let hour = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    // Add one hour
    let endHour = hour + 1;

    // Handle 12-hour clock rollover (optional)
    if (endHour >= 24) endHour -= 24;

    // Format hours and minutes with leading zeros if needed
    const format = (h, m) => `${h}:${m.toString().padStart(2, '0')}`;

    return `${format(hour, minutes)} - ${format(endHour, minutes)}`;
}

export default ReserveCard;