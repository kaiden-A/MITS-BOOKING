import { useState } from "react";
import Actives from "./components/Actives";
import Header from "./components/Header";
import Pasts from "./components/Pasts";
import Stats from "./components/Stats";

import './styles/KeyStorage.css'

import fetchData from "./util/fetchData.js";
import { useEffect } from "react";

function KeyStorage(){

    const mainColor  = "#7b2cbf";

    const [total , setTotal] = useState(0);
    const [avail , setAvail] = useState(0);
    const [taken , setTaken] = useState(0);

    const [activeKey , setActiveKey] = useState([]);
    const [histKey , setHistKey] = useState([]);

    useEffect(() => {

        takeData();
    } , [])

    const takeData = async () => {

        const data = await fetchData();

        setTotal(data.totalKeys);
        setAvail(data.totalAvail);
        setTaken(data.totalTaken);

        setActiveKey(data.active);
        setHistKey(data.past);
    }

    return(

        <main className="main-content">

            <Header 
                color={mainColor}
                data={histKey}
            />
            <Stats 
                avail={avail}
                total={total}
                taken={taken}
            />
            
            <div className="features-container">
                
                <Actives
                    keys={activeKey}
                />
                <Pasts/>
            </div>
        </main>
    )
}

export default KeyStorage;
