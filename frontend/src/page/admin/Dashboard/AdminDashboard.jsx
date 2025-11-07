import {Link} from 'react-router-dom';

import DataCard from './components/DataCard';
import Tabs from './components/Tabs';

import './styles/AdminDashboard.css'
import { useEffect, useState } from 'react';
import VenuesCard from './components/VenuesCard';
import UserCard from './components/UserCard';
import NewsCard from './components/NewsCard';
import ReserveData from './components/ReserveData';

function AdminDashboard(){

    const [venues , setVenues] = useState([]);
    const [reserve , setReserve] = useState([]);
    const [history , setHistory] = useState([]);
    const [users , setUsers] = useState([]);
    const [news , setNews] = useState([]);

    const [active , setActive] = useState("Venues");

    useEffect(() => {

        const fetchData = async() => {

            try{

                const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/admin/dashboard` , {
                    method : 'GET',
                    credentials : 'include'
                })

                const data = await responses.json();
                console.log(data);

                setVenues(data.venues);
                setReserve(data.reserve);
                setHistory(data.history);
                setNews(data.news);
                setUsers(data.users);

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
        
    }, [])

    const activeContent = (tab) => {
        setActive(tab);
    }


    return(

        <>
            <title>Admin's Dashboard</title>
            <div className="admin-content">

                <div className="admin-header">
                    <h2>Welcome Back Admin</h2>
                    <div className="admin-logout">
                        <span>admin@gmail.com</span>
                        <Link>logout</Link>
                    </div>
                </div>

                <DataCard
                    users={users.length}
                    venues={venues.length}
                    reserve={reserve.length}
                />
                <Tabs
                    handleTab={activeContent}
                />
                <div className='tab-content'>
                    {active === "Venues" && <VenuesCard venues={venues}/>}
                    {active === "Users" && <UserCard users={users}/>}
                    {active === "News" && <NewsCard news={news}/>}
                    {active === "Past" && <ReserveData activeCard={false} data={history}/>}
                    {active === "Active" && <ReserveData activeCard={true} data={reserve}/>}
                </div>

            </div>
        </>
    )
}

export default AdminDashboard;