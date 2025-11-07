

function ReserveData({activeCard , data}){

    return(
        <div className={`cards ${activeCard ? 'active' : 'past'}`}>
            {
                data.length > 0 ? (
                    data.map((d , i) => {
                        <div className={`${activeCard ? 'active-card' : 'past-card'}`}>
                            <h4>{d?.venueId?.name}</h4>
                            <p>{`Reserve By: ${d?.userId?.username}`}</p>
                            <p>{`Email: ${d?.userId?.email}`}</p>
                            <p>{`Date : ${d?.date.toLocaleString()}`}</p>
                        </div>
                    })
                ) : (
                    <div>{`${activeCard ? 'No Active Reservations' : 'No Past Reservations'}`}</div>
                )
            }

        </div>
    )
}

export default ReserveData;