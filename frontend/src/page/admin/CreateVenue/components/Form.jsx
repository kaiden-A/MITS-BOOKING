import { useState } from "react";
import Success from "../../../global/Success";

function Form({purple , purpleDark , purpleLight}){
    const [venueName, setVenueName] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState("");
    const [success, setSuccess] = useState(false);
    


    const handleForm = async (e) => {

      e.preventDefault();

        try{

            const responses = await fetch(`${import.meta.env.VITE_BACKEND_API}/admin/venues` , {
                credentials : 'include',
                headers : {'Content-type' : 'application/json'},
                method : 'POST',
                body : JSON.stringify({
                    name : venueName.toUpperCase(),
                    location,
                    capacity,
                    active: true
                })
            })

            const data = await responses.json();
            console.log(data);

            if(data.success){
                setSuccess(true);
                setVenueName("");
                setLocation("");
                setCapacity("");
            }

        }catch(err){
            console.log(err);
        }
    }


    return(
        <>
        <Success
            open={success}
            message={"Successfully Add Venue"}
            success={true}
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
                htmlFor="venueName"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: purpleDark,
                }}
              >
                Venue Name
              </label>
              <input
                type="text"
                id="venueName"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  border: `2px solid ${purpleLight}`,
                  borderRadius: "10px",
                  fontSize: "15px",
                  transition: "0.3s",
                }}
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
                htmlFor="location"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: purpleDark,
                }}
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  border: `2px solid ${purpleLight}`,
                  borderRadius: "10px",
                  fontSize: "15px",
                  transition: "0.3s",
                }}
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
                htmlFor="capacity"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: purpleDark,
                }}
              >
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
                min="1"
                style={{
                  width: "100%",
                  padding: "14px",
                  border: `2px solid ${purpleLight}`,
                  borderRadius: "10px",
                  fontSize: "15px",
                  transition: "0.3s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = purple)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = purpleLight)
                }
              />
            </div>

            <hr
              style={{
                border: "none",
                height: "1px",
                background: `linear-gradient(to right, transparent, ${purpleLight}, transparent)`,
                marginBottom: "30px",
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              style={{
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
              }}
            >
              <i className="fas fa-paper-plane"></i> CREATE VENUE
            </button>
          </form>
        </div>
        </>
    )

}

export default Form;