

function Stat({total , avail , taken}){

    return(

            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-icon key-available">
                        <i className="fas fa-key"></i>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{avail}</div>
                        <div className="stat-label">Keys Available</div>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon key-taken">
                        <i className="fas fa-user-check"></i>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{taken}</div>
                        <div className="stat-label">Keys Taken</div>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon total-keys">
                        <i className="fas fa-keyboard"></i>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{total}</div>
                        <div className="stat-label">Total Keys</div>
                    </div>
                </div>
            </div>
    )
}

export default Stat;