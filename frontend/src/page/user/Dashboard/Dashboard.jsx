import './styles/Dashboard.css'
import { useEffect ,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../global/LoadingSpinner';
import ReserveCard from './components/ReserveCard';
import EmptyState from './components/EmptyState';

import Success from '../../global/Success';
function Dashboard(){

    const [data , setData] = useState("");
    const [loading , setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async()=> {
            
            try{
                
                const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/dashboard` , {
                    credentials : 'include'
                });
                const data = await responses.json();

                setData(data);
                setLoading(false);

            }catch(err){
                console.log(err);
            }
            
        }

        fetchData();
    } , [])


    const logout = async () => {

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/logout` , {
                credentials : 'include'
            });
            const data = await responses.json();

            if(data.success){
                navigate('/login')
            }

        }catch(err){
            console.log(err);
        }

    }


    if(loading){
        return <LoadingSpinner text='fetching profile' size='large'/>
    }

    const deleteReserve = async (id) => {

        const data = await dlt(id);

        if(data.success){

            setData(d => ({...d , reserve : d.reserve.filter(r => r.reserveId !== id)}))
        }
    }


    const editReserve = async (id) => {
        
        const data = await dlt(id);

        if(data.success){
            navigate('/reserve');
        }
    }

    const dlt = async (id) => {

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/reservations/${id}` , {
                method :'DELETE',
                credentials : 'include',
                headers : {'Content-Type' : 'application/json'}
            })

            const data = await responses.json();
            
            return data;

        
        }catch(err){
            console.log(err);
        }
    }



    return(

        <>
            <title>User Dashboard</title>
            <main className="main-content">
                <header className="page-header">
                    <div className="page-title">
                        <h1>{`Welcome Back ${data.user.username}`}</h1>
                    </div>
                    <div className="user-actions">
                        <a className="logout-btn" onClick={logout}>
                            <i className="fas fa-sign-out-alt"></i>
                            Logout
                        </a>
                        <p className="user-email">{data.user.email}</p>
                    </div>
                </header>

                <div className="schedule-grid">
                    {
                        data.reserve.length > 0 ? (
                            data.reserve.map((r , i) => 
                                <ReserveCard key={i} 
                                    venue={r.name} 
                                    date={r.date} 
                                    time={r.slot} 
                                    handleDelete={() => deleteReserve(r.reserveId)}
                                    handleEdit={() => editReserve(r.reserveId)}
                                />
                            )
                        ): <EmptyState/>
                    }
                </div>
            </main>
        </>
    )

}

export default Dashboard;