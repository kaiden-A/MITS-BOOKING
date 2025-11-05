import { useEffect, useState } from 'react';
import ProfileContent from './components/ProfileContent';
import './styles/UserProfile.css'
import ChangePassword from './components/ChangePassword';

function UserProfile(){

    const [changePassword , setChangePassword] = useState(false);
    const [user , setUser] = useState({});

    useEffect(() => {

        const fetchUser = async () => {

            try{

                const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/user` ,{
                    credentials : 'include'
                })

                const data = await responses.json();
                setUser(data.user);

            }catch(err){
                console.log(err);
            }
        }

        fetchUser()

    }, [])


    return(

        <main className="main-content">
            <div className="page-header">
                <h1 className="page-title">{`${user?.username}'s Profile`}</h1>
                <hr className="page-divider"/>
            </div>

            <div className="profile-content">
                
              <ProfileContent name={user?.username} email={user?.email}/>

                
                <button className="change-password-btn" onClick={() => setChangePassword(!changePassword)}>
                    <i className="fas fa-key"></i>
                    Change Password
                </button>

                <ChangePassword open={changePassword}/>
            </div>
        </main>
    )

}

export default UserProfile;