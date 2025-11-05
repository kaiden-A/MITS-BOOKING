import { Link } from "react-router-dom";

function EmptyState(){

    return(

        <div className="empty-state">
            <div className="empty-icon">
                <i className="far fa-calendar-times"></i>
            </div>
            <h3>No schedules right now</h3>
            <p>There are no schedules at the moment</p>
            <Link to={"/reserve"} className="create-link">
                <i className="fas fa-plus"></i>
                Create now
            </Link>
        </div>
    )

}

export default EmptyState;