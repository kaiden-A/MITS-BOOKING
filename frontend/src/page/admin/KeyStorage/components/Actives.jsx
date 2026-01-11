import { useMemo } from "react";
import { useState } from "react"


function Actives({keys}){

    const [searchInput , setSearchInput] = useState("");

    const finalisedArray  = useMemo(() => {

        let arr = [...keys];

        if(searchInput.trim() !== ""){
            arr = keys.filter(k => k.venueId.name.toLowerCase().includes(searchInput.toLowerCase()) )
        }

        return arr;
    } , [keys , searchInput])

    return(

        <div className="feature-card">
            <div className="feature-header">
                <h2 className="feature-title">
                    <i className="fas fa-key feature-icon"></i>
                    Current Key Status
                </h2>
                <button className="refresh-btn">
                    <i className="fas fa-sync-alt"></i>
                    Refresh
                </button>
            </div>

            <div className="search-filter">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search for a venues..." 
                    id="keySearch"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <select className="filter-select" id="keyFilter">
                    <option value="all">All Keys</option>
                    <option value="available">Available Only</option>
                    <option value="taken">Taken Only</option>
                </select>
            </div>

            <table className="key-table">
                <thead>
                    <tr>
                        <th>Venue</th>
                        <th>Key Status</th>
                        <th>Key Holder</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        finalisedArray.map(key => 
                           <tr key={key?._id}>
                                <td className="venue-cell">{key?.venueId?.name}</td>
                                <td>
                                    <span 
                                        className={`status-badge ${key?.keyStatus === "available" ? "status-available" : "status-taken"}`}
                                    >
                                        {`${key?.keyStatus === "available" ? "available" : "taken"} `}
                                    </span>
                                </td>
                                <td>
                                    {
                                        key?.keyStatus === "available" ? (
                                            <span className="not-available">available to use</span>
                                        ) : (
                                            
                                            <div className="key-holder">
                                                <div  style={userAvatar}>{key?.userId?.username[0]}</div>
                                                <div style={userInfo}>
                                                    <div style={userName}>{key?.userId?.username}</div>
                                                    <div style={userEmail}>{key?.userId?.email}</div>
                                                </div>

                                            </div>
                                        )
                                    }
                                </td>
                                <td>
                                    {key?.createdAt || "2026-01-01"}
                                </td>
                           </tr> 
                        )
                    }

 
                </tbody>
            </table>
        </div>
    )
}

const userAvatar = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#A020F0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: 600,
    fontSize: "14px"
}

const userInfo =  {
    display: "flex",
    flexDirection: "column"
}

const userName = {
    fontWeight: 500,
    fontSize: "14px"
}

const userEmail = {
    fontSize: "12px",
    color: "black"
}

export default Actives;