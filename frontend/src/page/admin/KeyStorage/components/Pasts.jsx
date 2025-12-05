

function Pasts(){

    return(

        <div className="feature-card">
            <div className="feature-header">
                <h2 className="feature-title">
                    <i className="fas fa-history feature-icon"></i>
                    Key Reservation History
                </h2>
                <button className="refresh-btn" onclick="refreshReservationHistory()">
                    <i className="fas fa-sync-alt"></i>
                    Refresh
                </button>
            </div>

            <div className="search-filter">
                <input type="text" className="search-input" placeholder="Search reservations..." id="historySearch"/>
                <select className="filter-select" id="historyFilter">
                    <option value="all">All Reservations</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>
            </div>

            <div className="reservation-list" id="reservationList">
            </div>
        </div>
    )

}

export default Pasts;