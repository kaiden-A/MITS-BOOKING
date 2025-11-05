

function ProfileContent({name , email}){

    return(
        <div className="user-info">
            <div className="info-item">
                <div className="info-icon">
                    <i className="fas fa-user"></i>
                </div>
                <div className="info-content">
                    <div className="info-label">Name</div>
                    <div className="info-value">{name}</div>
                </div>
            </div>

            <div className="info-item">
                <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                </div>
                <div className="info-content">
                    <div className="info-label">Email</div>
                    <div className="info-value">{email}</div>
                </div>
            </div>
        </div>
    )
}
export default ProfileContent;