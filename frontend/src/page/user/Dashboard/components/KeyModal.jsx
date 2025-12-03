import '../styles/KeyModal.css';
import Success from '../../../global/Success';
import { useState } from 'react';

function KeyModal({title  , isOpen , onClose , id }){

    if (!isOpen) return null;

    const [succBox , setSuccBox] = useState(false);
    const [errBox , setErrBox] = useState(false);
    const [msg , setMsg] = useState("");


    const reserveKey = async () => {

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/keys/${id}/take` ,  {
                method : 'POST',
                credentials : 'include'
            })

            const data = await responses.json();
            console.log(data);

            if(data.success){
                setErrBox(false);
                setMsg(data.msg);
                setSuccBox(true);
            }

            if(data.error){
                setSuccBox(false);
                setMsg(data.msg);
                setErrBox(true);
            }

        }catch(err){
            console.log(err);
        }
    }

    const returnKey = async () => {
        
        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/keys/${id}/return` ,  {
                method : 'POST',
                credentials : 'include'
            })

            const data = await responses.json();
            console.log(data);

            if(data.success){
                setErrBox(false);
                setMsg(data.msg);
                setSuccBox(true);
            }

            if(data.error){
                setSuccBox(false);
                setMsg(data.msg);
                setErrBox(true);
            }

        }catch(err){
            console.log(err);
        }
    }

    return (
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
            <div className="modal" id="deleteModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">{`${title}'s Key`}</h3>
                        <button className="close-modal" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p> 
                            By clicking the <strong>Reserve</strong> button, 
                            you agree to take full responsibility for 
                            the safe handling and timely return of the key.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button className="card-btn reschedule-btn" onClick={reserveKey} >Reserve</button>
                        <button className="card-btn delete-btn" onClick={returnKey} >Return</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default KeyModal;