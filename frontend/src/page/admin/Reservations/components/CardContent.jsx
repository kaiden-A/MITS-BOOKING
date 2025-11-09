import { useEffect, useState , useMemo } from "react";

function CardContent({venues}){

    const [searchPrompt , setSearchPrompt] = useState("");
    const [filter , setFilter] = useState("date");

    const sortedAndSearchArray = useMemo(() => {

        let sorted = [...venues];

        if(filter === '-date'){
            sorted.sort((a , b) => new Date(b.date) - new Date(a.date))
        }else if(filter === 'date'){

            sorted.sort((a , b) => new Date(a.date) - new Date(b.date))
        }

        if(searchPrompt.trim() !== ""){

            if(filter === "pic"){
                sorted = sorted.filter(v => v.username.toLowerCase().includes(searchPrompt.toLowerCase()))
            }else{
               sorted = sorted.filter(v => v.name.toLowerCase().includes(searchPrompt.toLowerCase())) 
            }

        }

        return sorted

    } , [filter , venues , searchPrompt])

    const handleSub = (e) => {
        e.preventDefault();
    }

    return(
        <div className="card-content">

            <div className="search-filter" onSubmit={handleSub}>
                <form>
                    <input 
                        type="text" 
                        name="userInput" 
                        placeholder="Enter a venue name..."
                        value={searchPrompt}
                        onChange={(e) => setSearchPrompt(e.target.value)}    
                    />
                </form>
                <div className="filter">
                    <select id="sort-selection" onChange={(e) => setFilter(e.target.value)}>
                        <option value="">Filter</option>
                        <option value="date">Ascending Order</option>
                        <option value="-date">Discending Order</option>
                        <option value={"pic"}>Supervisor</option>
                    </select>
                </div>
            </div>
            <div className="card-grid-parent">
                {
                    sortedAndSearchArray?.length > 0 ? (
                        sortedAndSearchArray?.map((venue , i) => 
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