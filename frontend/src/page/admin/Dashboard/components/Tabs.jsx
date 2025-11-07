import { useState } from 'react';
import '../styles/Tabs.css';

function Tabs({handleTab}){

    const [activeTab , setActiveTab] = useState("Venues");

    const tabs = ["Venues" , "Users" , "News"  , "Past" , "Active"];

    return(

        <div className="admin-tabs">
            {
                tabs.map((tab , i) => 
                    <button
                        key={i}
                        className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(tab)
                            handleTab(tab)
                        }}
                    >{tab}
                    </button>
                )
            }

        </div>
    )

}
export default Tabs;