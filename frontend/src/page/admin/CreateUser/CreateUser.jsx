import Form from "./components/Form";
function CreateUser() {

  const purple = "#7a2f87"; // main purple color
  const purpleLight = "#b46cc1"; // lighter purple
  const purpleDark = "#5a2163"; // darker purple

  const cleanForm = () => {

    setVenueName("");
    setLocation("");
    setCapacity("");
  }

  return (
    <>
      <title>Add New Users</title>
      <main
        style={{
          padding: "40px",
          flex: 1,
          boxSizing: "border-box",
          backgroundColor: "#faf9fc",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            paddingBottom: "20px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: purple,
            }}
          >
            Create a Venue
          </h1>

          <button
            style={{
              background: `linear-gradient(135deg, ${purpleLight}, ${purple})`,
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px 20px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(122, 47, 135, 0.3)",
            }}

            onClick={() => cleanForm()}
          >
            <i className="fas fa-plus-circle"></i> Create New Venue
          </button>
        </div>
        
        <Form
            purple={purple}
            purpleDark={purpleDark}
            purpleLight={purpleLight}
        />
       
      </main>
    </>
  );
}

export default CreateUser;
