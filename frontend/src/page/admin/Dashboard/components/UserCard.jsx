import { useState } from 'react';
import DeleteModal from './DeleteModal';
import Success from '../../../global/Success';
function UserCard({users , setUsers}){

    const [user , setUser] = useState("");
    const [userId , setUserId] = useState("");
    const [openDlt , setOpenDlt] = useState(false);

    const [succBox , setSuccBox] = useState(false);
    const [errBox , setErrBox] = useState(false);
    const [msg , setMsg] = useState("");

    const deleteUser = async () => {

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/admin/users/${userId}` , {
                method : 'DELETE',
                credentials : 'include'
            })

            const data = await responses.json();

            if(data.error){
                setMsg(data.msg);
                setSuccBox(false);
                setErrBox(true);
            }

            if(data.success){

                setMsg(data.msg);
                setErrBox(false);
                setSuccBox(true);

                setUsers(u => u.filter(user => user._id.toString() !== userId));

                setOpenDlt(false);
            }

        }catch(err){
            console.log(err);
        }
    }

    return(

        <>
            <Success
                open={succBox}
                onClose={() => setSuccBox(!succBox)}
                message={msg}
                success={true}
            />
            <Success
                open={errBox}
                onClose={() => setErrBox(!errBox)}
                message={msg}
                success={false}
            />
        
            <div className="cards venues">
                {
                    users.length > 0 ? (
                        users.map((user , i) => 
                            <div className="user-card" key={i}
                                onClick={() => {
                                    setUser(user.username);
                                    setUserId(user._id);
                                    setOpenDlt(!openDlt)
                                }}
                            >
                                <h4>{user.username}</h4>
                                <p>{user.email}</p>
                            </div>
                        )
                    ) : (
                        <p>No User Found</p>
                    )
                }
            </div>
            <DeleteModal
                title={user}
                onDelete={deleteUser}
                isOpen={openDlt}
                onClose={() => setOpenDlt(!openDlt)}
            />
        </>

    )
}

export default UserCard;