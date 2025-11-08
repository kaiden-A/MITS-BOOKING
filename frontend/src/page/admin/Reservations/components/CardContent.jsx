import { useEffect, useState , useMemo } from "react";

function CardContent({venues}){

    const [searchPrompt , setSearchPrompt] = useState("");
    const [descend , setDescend] = useState("");

    const sortedAndSearchArray = useMemo(() => {

        let sorted = [...venues];

        if(descend === '-date'){
            sorted.sort((a , b) => b.date - a.date)
        }else{
            sorted.sort((a , b) => a.date - b.date)
        }

        return sorted

    } , [descend , venues])

    return(
        <div className="card-content">

            <div className="search-filter">
                <form>
                    <input type="text" name="userInput" placeholder="Enter a venue name..."/>
                </form>
                <div className="filter">
                    <select id="sort-selection" onChange={(e) => setDescend(e.target.value)}>
                        <option value="">Filter</option>
                        <option value="date">Ascending Order</option>
                        <option value="-date">Discending Order</option>
                    </select>
                </div>
            </div>
            <div className="card-grid-parent">
                {
                    sortedAndSearchArray.length > 0 ? (
                        venues.map((venue , i) => 
                            <div className="card" key={i}>
                                <p className="name">{venue.name}</p>

                                <p className="date">{venue.date}</p>
                                <p className="slot">{venue.slot}</p>
                                <hr className="devider"/>

                                <p className="teacher">{`Supervisor : ${venue.username}`}</p>
                            
                                <p className="reason">{`Reason : ${venue.reason}`}</p>
                            </div>
                        )
                    ) : (
                        <p>No Data</p>
                    )
                }
                
            </div>

        </div>
    )
   
}

export default CardContent;