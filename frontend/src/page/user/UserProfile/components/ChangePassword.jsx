import { useState } from "react";
import Success from "../../../global/Success";

function ChangePassword({open}){

    const [password , setPasswowrd] = useState("");
    const [checkPass , setCheckPass] = useState("");
    const [newPass , setNewPass] = useState("");

    const [success , setSuccess] = useState(false);
    const [error , setError] = useState(false);
    const [msgBox , setBoxMsg] = useState("")


    const changePassword = async (e) => {
        e.preventDefault();

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/user` , {
                method : 'POST',
                credentials : 'include',
                headers : {'Content-type' : 'application/json'},
                body : JSON.stringify({oldPassword : password , newPassword : newPass})
            });

            const data = await responses.json();

            if(data.error){
                setSuccess(false);
                setBoxMsg(data.msg);
                setError(true);
            }
            
            if(data.success){
                setError(false);
                setBoxMsg(data.msg);
                setSuccess(true);
            }

        }catch(err){
            console.log(err);
        }
    }

    return(
    <>
        <Success
            open={success}
            message={msgBox}
            success={true}
        />
        <Success
            open={error}
            message={msgBox}
            success={false}
        />
        <form className={`password-form ${open ? "active" : ""}`} onSubmit={changePassword}>
            <div className="form-group">
                <label htmlFor="old" className="form-label">Current Password</label>
                <input type="password" placeholder="Enter your current password..."  
                    className="form-control" 
                    required
                    value={password}
                    onChange={(e) => setPasswowrd(e.target.value)}
                />
                <div className="error-message">Please enter your current password</div>
            </div>

            <div className="form-group">
                <label htmlFor="new" className="form-label">New Password</label>
                <input type="password" placeholder="Enter your new password..." 
                    className="form-control" 
                    required 
                    minLength="6"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                />
                <div className="error-message">Password must be at least 6 characters long</div>
            </div>

            <div className="form-group">
                <label htmlFor="confirm" className="form-label">Confirm Your New Password</label>
                <input type="password" placeholder="Confirm your new password..."
                    className="form-control" 
                    required
                    value={checkPass}
                    onChange={(e) => setCheckPass(e.target.value)}
                />
                <div className="error-message">Passwords do not match</div>
            </div>

            <button type="submit" className="submit-btn">
                <i className="fas fa-paper-plane"></i>
                SUBMIT
            </button>
        </form>
    </>
    )

}

export default ChangePassword;