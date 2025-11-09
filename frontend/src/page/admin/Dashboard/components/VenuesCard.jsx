

function VenuesCard({venues}){

    return(

        <div className="cards venues">
            {
                venues.length > 0 ? (
                    venues.map((venue, i) => 
                        <div key={i} className="venue-card">
                            <h4>{venue?.name}</h4>
                            <p>
                                Status:
                                {
                                    venue?.active ? (
                                        <span className="status active">Active</span>
                                    ) : (
                                        <span className="status disabled">Disable</span>
                                    )
                                }
                            </p>
                        </div>
                    )
                ) : (
                    <p>No Venues Available</p>
                )
            }

        </div>
    )
}

export default VenuesCard;