

function EmptyState(){

    return(

        <div className="empty-state" id="emptyState">
            <div className="empty-icon">
                <i className="far fa-calendar-alt"></i>
            </div>
            <h3>No Search Results</h3>
            <p>Select a date and venue to check availability</p>
        </div>
    )
}

export default EmptyState