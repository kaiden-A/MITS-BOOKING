import { useState, useEffect } from "react";

function Success({ open, message, success }) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  if (!visible) return null;

  const style = {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    backgroundColor: success
      ? "rgba(40, 167, 69, 0.1)"
      : "rgba(167, 40, 40, 0.1)",
    border: success
      ? "1px solid rgba(40, 167, 69, 0.2)"
      : "1px solid rgba(167, 40, 40, 0.2)",
    color: success ? "#28a745" : "#b72727",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    animation: "fadeIn 0.3s ease",
  };

  const closeButtonStyle = {
    marginLeft: "10px",
    background: "transparent",
    border: "none",
    color: success ? "#28a745" : "#b72727",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div style={style}>
      {message}
      <button
        onClick={() => setVisible(false)}
        style={closeButtonStyle}
        aria-label="Close"
      >
        ✖
      </button>
    </div>
  );
}

export default Success;
