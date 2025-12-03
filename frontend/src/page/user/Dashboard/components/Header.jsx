

function Header({username , email , handleLogout}){

    return(

        <header className="page-header">
            <div className="page-title">
                <h1>{`Welcome Back ${username}`}</h1>
            </div>
            <div className="user-actions">
                <a className="logout-btn" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                </a>
                <p className="user-email">{email}</p>
            </div>
        </header>
    )

}

export default Header;