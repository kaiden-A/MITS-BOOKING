import axios from 'axios';

function DeleteReservations({title , onClose , username , slot , id , setVenues}){

    const dltReserve = async () => {

        try{

            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/admin/reservations/${id}`);

            if(res.data.success){
                setVenues(v => v.filter(ve => ve.id !== id));
                onClose();
            }

        }catch(err){
            console.error(err.message);
        }

    }


    return(
        <>
            <div className="modal" id="deleteModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">{`${title}'s Reservations`}</h3>
                        <button className="close-modal" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p> 
                            By clicking the <strong>Delete</strong> button, 
                            <strong>{username}</strong> will have their access 
                            revoked and will no longer be able to book 
                            this venue for the <strong>{slot}</strong> time slot.
                        
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button className="card-btn" onClick={onClose}  >Cancel</button>
                        <button className="card-btn delete-btn" onClick={dltReserve}  >Delete</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default DeleteReservations;