import { Link , useNavigate } from "react-router-dom";
import '../styles/sign.css'
import { useState } from "react";
import Success from '../Success';

function LogIn(){

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const [errBox , setErrBox] = useState(false);
    const [errMsg , setErrMsg] = useState("");

    const navigate = useNavigate();

    const handleForm = async (e) => {

        e.preventDefault();

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/login` , {
                method : 'POST',
                credentials : 'include',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({email , password})
            })

            const data = await responses.json();

            if(data.error){
                setErrMsg(data.msg);
                setErrBox(true);
            }

            if(data.success){
                navigate('/dashboard')
            }

        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <Success
            open={errBox}
            message={errMsg}
            success={false}
            onClose={() => setErrBox(false)}
        />
        
        <title>LogIn page</title>

        <div className="container">
                <div className="header">
                    <div className="logo">
                        <img src="/mitsLogo.png" alt="School Logo"/>
                    </div>
                    <div className="school-name">
                        <h1 style={{color :  "#22863a"}}>Maahad Integrasi Tahfiz Selangor</h1>
                        <p>Alam Impian Klang</p>
                    </div>
                </div>
                
                <div className="main-content" style={{ flex: "1" , display: "flex" , flexDirection: "column" ,justifyContent: "center"}}>
                    <div className="error-box" id="errorBox">
                        <i className="fas fa-exclamation-circle"></i> Invalid email or password. Please try again.
                    </div>
                    
                    <div className="form-container">
                        <div className="form-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to your account to continue</p>
                        </div>
                        
                        <form onSubmit={handleForm}>
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-envelope"></i>
                                    <input type="email" placeholder="Enter your email" required
                                        onChange={(e) => setEmail(e.target.value) }
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-lock"></i>
                                    <input type="password"  placeholder="Enter your password" required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
    
                                </div>
                            </div>

                            <div className="divider">
                                <span>OR</span>
                            </div>

                            <button type="submit" id="loginButton">LOGIN</button>
                            
                            <div className="form-footer">
                                <p>Have any Problem? Please contact the School Technician</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <footer>
                <p>Copyright &copy; 2025 by Kaiden-A</p>
            </footer>

            
        </>
    )

}

export default LogIn;