import { Outlet , useNavigate} from "react-router-dom";
import AdminSidebar from "./AdminSideBar";
import { useEffect } from "react";

function AdminPage(){

    const navigate = useNavigate();

    useEffect(() => {

        const checkAdmin = async () => {
            try{

                const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/admin` , {
                    credentials : 'include',
                    method :'GET' 
                });

                const data = await responses.json();

                if(!data.cookies){
                    navigate('/admin/login')
                }

                if(data.cookies){
                    navigate('/admin/dashboard')
                }

            }catch(err){
                console.log(err);
            }
        }
        checkAdmin();
    } , [])

    return(
            <div style={{display: "flex" , flexDirection: "row", height: "100vh"}}>
                <AdminSidebar/>
                <Outlet></Outlet>
            </div>

    )
}

export default AdminPage;