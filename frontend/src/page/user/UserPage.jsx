import Sidebar from "./Sidebar";

import {Outlet , useNavigate} from 'react-router-dom';
import { useEffect } from "react";

function UserPage(){

    const navigate = useNavigate()

      useEffect(() => {

        const fetchData = async () => {

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/` , {
            method : 'GET',
            credentials : 'include'
            })

            const data = await responses.json();

            if(!data.cookies){
                navigate('/login')
            }else{
                navigate('/dashboard')
            }

        }catch(err){
            console.log(err);
        }
        }

        fetchData();
    }, [])

    return(
        <>
            <div style={{display: "flex" , flexDirection: "row", height: "100vh"}}>
                <Sidebar/>
                <Outlet></Outlet>
            </div>

        </>
    )
}

export default UserPage;