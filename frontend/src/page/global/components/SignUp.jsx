import '../styles/sign.css'
import { Link } from 'react-router-dom';

function SignUp(){

    return(

        <>
        <body style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark)"}}></body>
        <title>SignUp page</title>

        <div className="container">
                <div className="header">
                    <div className="logo">
                        <img src="/mitsLogo.png" alt="School Logo"/>
                    </div>
                    <div className="school-name">
                        <h1>Maahad Integrasi Tahfiz Selangor</h1>
                        <p>Alam Impian Klang</p>
                    </div>
                </div>
                
                <div className="main-content">
                    <div className="error-box" id="errorBox">
                        <i className="fas fa-exclamation-circle"></i> Invalid email or password. Please try again.
                    </div>
                    
                    <div className="form-container">
                        <div className="form-header">
                            <h2>Nice to Meet You</h2>
                            <p>Sign up to continue</p>
                        </div>
                        
                        <form id="loginForm">

                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-envelope"></i>
                                    <input type="text" placeholder="Enter your email" required/>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-envelope"></i>
                                    <input type="email" id="email" name="email" placeholder="Enter your email" required/>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" id="password" name="password" placeholder="Enter your password" required/>
                                </div>
                            </div>

                            <div className="divider">
                                <span>OR</span>
                            </div>

                            <button type="submit" id="loginButton">SIGN UP</button>
                            
                            <div className="form-footer">
                                <p>Already have an account? <Link to={'/login'}>Log In</Link></p>
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
export default SignUp;