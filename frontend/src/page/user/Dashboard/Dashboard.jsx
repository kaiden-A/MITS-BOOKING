import './styles/Dashboard.css'
import { useEffect ,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../global/LoadingSpinner';
import ReserveCard from './components/ReserveCard';
import EmptyState from './components/EmptyState';

import Success from '../../global/Success';
import KeyModal from './components/KeyModal';
import Header from './components/Header';
function Dashboard(){

    const [data , setData] = useState({});
    const [loading , setLoading] = useState(true);
    
    const [venueName , setVenueName] = useState("");
    const [venueId , setVenueId] = useState(0);
    const [openModal , setOpenModal] = useState(false);

    const [noti , setNoti] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async()=> {
            
            try{
                
                const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/dashboard` , {
                    credentials : 'include'
                });
                
                const data = await responses.json();
                console.log(data);


                setData(data);
                setLoading(false);

            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
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
            setNoti(true);
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

    const active = (name , id) => {
        setVenueName(name);
        setVenueId(id);
        setOpenModal(true);
    }



    return(

        <>
            <Success
                open={noti}
                onClose={() => setNoti(false)}
                message={'Successfully Delete Booking'}
                success={true}
            />
            <title>User Dashboard</title>
            <main className="main-content">
                <Header
                    username={data.user.username}
                    email={data.user.email}
                    handleLogout={logout}
                />
                <div className="schedule-grid">
                    {
                        data.reserve.length > 0 ? (
                            data.reserve.map((r , i) => 
                                <ReserveCard key={i}
                                    handleActivation={() => active(r?.name , r?.venueId)} 
                                    venue={r?.name} 
                                    date={r?.date} 
                                    time={r?.slot} 
                                    handleDelete={() => deleteReserve(r?.reserveId)}
                                    handleEdit={() => editReserve(r?.reserveId)}
                                />
                            )
                        ): <EmptyState/>
                    }
                </div>
            </main>
            <KeyModal
                isOpen={openModal}
                onClose={() => setOpenModal(!openModal)}
                title={venueName}
                id={venueId}
            />
        </>
    )

}

export default Dashboard;