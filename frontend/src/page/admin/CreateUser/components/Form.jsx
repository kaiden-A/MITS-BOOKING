import { useState } from "react";
import Success from "../../../global/Success";

function Form({purple , purpleDark , purpleLight}){

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState(false);
    const [msg , setMsg] = useState("");
    const [error , setError] = useState(false);


    const handleForm = async (e) => {

      e.preventDefault();

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/admin/users` , {
                credentials : 'include',
                headers : {'Content-type' : 'application/json'},
                method : 'POST',
                body : JSON.stringify({email, username, password})
            })

            const data = await responses.json();

            if(data.error){
                setSuccess(false);
                setMsg(data.msg);
                setError(true);
                reset();

            }

            if(data.success){
                setError(false);
                setMsg(data.msg)
                setSuccess(true);
                reset();
            }

        }catch(err){
            console.log(err);
        }
    }

    const reset =() =>{
        setEmail("");
        setUsername("");
        setPassword("");
    }


    return(
        <>
        <Success
            open={success}
            message={msg}
            onClose={() => setSuccess(!success)}
            success={true}
        />
        <Success
            open={error}
            message={msg}
            onClose={() => setError(!error)}
            success={false}
        />
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <form onSubmit={handleForm}>
            {/* Venue Name */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="userEmail"
                style={label}
              >
                Email
              </label>
              <input
                type="text"
                id="venueName"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={input}
                onFocus={(e) =>
                  (e.target.style.borderColor = purple)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = purpleLight)
                }
              />
            </div>

            {/* Location */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="username"
                style={label}
              >
                username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={input}
                onFocus={(e) =>
                  (e.target.style.borderColor = purple)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = purpleLight)
                }
              />
            </div>

            {/* Capacity */}
            <div style={{ marginBottom: "30px" }}>
              <label
                htmlFor="pass"
                style={label}
              >
                Password
              </label>
              <input
                type="password"
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                min="1"
                style={input}
                onFocus={(e) =>
                  (e.target.style.borderColor = purple)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = purpleLight)
                }
              />
            </div>

            <hr
              style={hr}
            />

            {/* Submit Button */}
            <button
              type="submit"
              style={button}
            >
              <i className="fas fa-paper-plane"></i> CREATE USER
            </button>
          </form>
        </div>
        </>
    )

}

const purple = "#7a2f87"; // main purple color
const purpleLight = "#b46cc1"; // lighter purple
const purpleDark = "#5a2163"; // darker purple

const button = {
    background: `linear-gradient(135deg, ${purpleLight}, ${purple})`,
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "block",
    width: "100%",
    boxShadow: "0 6px 15px rgba(122,47,135,0.3)",
}

const hr  = {
    border: "none",
    height: "1px",
    background: `linear-gradient(to right, transparent, ${purpleLight}, transparent)`,
    marginBottom: "30px",
}

const input = {
    width: "100%",
    padding: "14px",
    border: `2px solid ${purpleLight}`,
    borderRadius: "10px",
    fontSize: "15px",
    transition: "0.3s",
}

const label = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: purpleDark,
}
export default Form;