import '../styles/DataCard.css'

function DataCard({users , venues , reserve}){

    return(

        <div className="admin-stats">
        <div className="admin-stat-card yellow">
            <i className="fa-solid fa-calendar-day"></i>
            <h3>{reserve}</h3>
            <p>Today's Reservations</p>
        </div>
        <div className="admin-stat-card green">
            <i className="fa-solid fa-users"></i>
            <h3>{users}</h3>
            <p>Total Users</p>
        </div>
        <div className="admin-stat-card orange">
            <i className="fa-solid fa-building"></i>
            <h3>{venues}</h3>
            <p>Total Venues</p>
        </div>
        </div>
    )
}

export default DataCard;