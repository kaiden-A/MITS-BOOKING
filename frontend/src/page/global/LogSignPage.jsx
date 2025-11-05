import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

function LogSignPage({login}){

    return(

        login ? <LogIn/> : <SignUp/>
    )
}

export default LogSignPage;