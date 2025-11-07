import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSideBar";

function AdminPage(){

    return(
            <div style={{display: "flex" , flexDirection: "row", height: "100vh"}}>
                <AdminSidebar/>
                <Outlet></Outlet>
            </div>

    )
}

export default AdminPage;