import '../styles/KeyModal.css';

function KeyModal({title  , isOpen , onClose }){

    if (!isOpen) return null

    return (

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
                    <button className="card-btn reschedule-btn" >Reserve</button>
                    <button className="card-btn delete-btn" >Return</button>
                </div>
            </div>
        </div>
    )

}

export default KeyModal;