

function UserCard({users}){

    return(

        <div className="cards venues">
            {
                users.length > 0 ? (
                    users.map((user , i) => 
                        <div className="user-card">
                            <h4>{user.username}</h4>
                            <p>{user.email}</p>
                        </div>
                    )
                ) : (
                    <p>No User Found</p>
                )
            }
        </div>
    )
}

export default UserCard;