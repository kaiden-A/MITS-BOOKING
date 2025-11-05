

function Slot({occupied , user , time}){

    return(

        <>
            <div class={`time-slot-card ${occupied ? 'occupied' : 'available'}`}>
              <div class="time-header">
                    <div class={`time-value ${occupied ? 'occupied' : 'available'}`}>{time}</div>
                    <div class={`status-badge  ${occupied ? 'occupied' : 'available'}`}>{`${occupied ? 'Occupied' : 'Available'}`}</div>
                </div>
                <div class="occupant-info">
                    {
                        occupied ? (
                            <div>
                                <div class="user-avatar">{user[0].toUpperCase()}</div>
                                <div class="user-name">{user}</div>
                            </div>
                        ): (
                           <div class="no-occupant">Not Being Reserved/Used</div> 
                        )
                    }
                </div>
            </div>
        
        </>
    )

}

export default Slot;