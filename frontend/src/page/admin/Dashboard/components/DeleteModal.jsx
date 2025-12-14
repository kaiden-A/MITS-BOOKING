

function DeleteModal({title  , isOpen , onClose , onDelete}){

    if (!isOpen) return null;



    return (
        <>
            <div className="modal" id="deleteModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">{`${title}`}</h3>
                        <button className="close-modal" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p> 
                            Clicking the <strong>Delete</strong> button will 
                            permanently remove the user's data and it cannot be recovered.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button className="card-btn" onClick={onClose} >Cancel</button>
                        <button className="card-btn delete-btn" onClick={onDelete} >Delete</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default DeleteModal;