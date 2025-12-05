import convertCSV from '../util/convertCSV.js';

function Header({color , data}){

    return(

            <div className="page-header">
                <h1 className="page-title" style={{color : color}}>Key Management Dashboard</h1>
                <div className="admin-actions">
                    <button className="action-btn" style={{backgrounColor : color}}>
                        <i className="fas fa-sync-alt"></i>
                        Refresh
                    </button>
                    <button className="action-btn" onClick={() => convertCSV(data , "past-keys-holder.xlsx")}>
                        <i className="fas fa-download"></i>
                        Export Report
                    </button>
                </div>
            </div>
    )
}

export default Header;