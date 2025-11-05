import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false); // Sidebar toggle state

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsActive(false); // close sidebar after clicking link (on mobile)
  };

  return (
    <>
      {/* BURGER MENU (Mobile) */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </button>

      {/* SIDEBAR */}
      <nav className={`sidebar ${isActive ? "active" : ""}`}>
        <div>
          <div className="sidebar-header">
            <div className="logo">K</div>
            <div>
              <div className="brand-name">Dashboard</div>
              <div className="creator">made by Kaiden-A</div>
            </div>
          </div>

          <hr
            style={{
              border: "none",
              height: "1px",
              background: "rgba(255,255,255,0.3)",
              margin: "20px 0",
            }}
          />

          <div className="nav-section">
            <p className="nav-section-title">Navigation</p>

            <button
              className={`nav-item ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
              onClick={() => handleNavigate("/dashboard")}
            >
              <span className="nav-icon">
                <i className="fas fa-home"></i>
              </span>
              User's Dashboard
            </button>

            <button
              className={`nav-item ${
                location.pathname === "/reserve" ? "active" : ""
              }`}
              onClick={() => handleNavigate("/reserve")}
            >
              <span className="nav-icon">
                <i className="fas fa-calendar-plus"></i>
              </span>
              Create new Schedule
            </button>

            <button
              className={`nav-item ${
                location.pathname === "/check" ? "active" : ""
              }`}
              onClick={() => handleNavigate("/check")}
            >
              <span className="nav-icon">
                <i className="fas fa-search"></i>
              </span>
              Check Schedule
            </button>

            <button
              className={`nav-item ${
                location.pathname === "/profile" ? "active" : ""
              }`}
              onClick={() => handleNavigate("/profile")}
            >
              <span className="nav-icon">
                <i className="fas fa-user"></i>
              </span>
              User Account
            </button>
          </div>
        </div>

        <p className="sidebar-footer">Copyright &copy; by Kaiden-A</p>
      </nav>

      {/* OVERLAY when sidebar is open */}
      {isActive && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Sidebar;
