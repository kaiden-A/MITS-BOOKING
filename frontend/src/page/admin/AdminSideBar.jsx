import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => setIsActive((prev) => !prev);
  const handleNavigate = (path) => {
    navigate(path);
    setIsActive(false);
  };

  // Admin accent color
  const accent = "#904099";
  const activeBg = "#b26abf"; // lighter purple for active button
  const hoverBg = "#a35fb0"; // slightly brighter for hover

  return (
    <>
      {/* BURGER MENU (Mobile) */}
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        style={{
          background: accent,
        }}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* SIDEBAR */}
      <nav
        className={`sidebar ${isActive ? "active" : ""}`}
        style={{
          background: accent,
        }}
      >
        <div>
          <div className="sidebar-header">
            <div
              className="logo"
              style={{
                color: accent,
              }}
            >
              A
            </div>
            <div>
              <div className="brand-name">Admin Panel</div>
              <div className="creator">made by Kaiden-A</div>
            </div>
          </div>

          <hr
            style={{
              border: "none",
              height: "1px",
              background: "rgba(255,255,255,0.4)",
              margin: "20px 0",
            }}
          />

          <div className="nav-section">
            <p className="nav-section-title">Navigation</p>

            {/* Admin Dashboard */}
            <button
              className="nav-item"
              style={{
                background:
                  location.pathname === "/admin/dashboard" ? activeBg : "rgba(255,255,255,0.15)",
                color: "white",
              }}
              onClick={() => handleNavigate("/admin/dashboard")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/dashboard" ? activeBg : hoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/dashboard" ? activeBg : "rgba(255,255,255,0.15)")
              }
            >
              <span className="nav-icon">
                <i className="fas fa-home"></i>
              </span>
              Admin Dashboard
            </button>

            {/* Create Venue */}
            <button
              className="nav-item"
              style={{
                background:
                  location.pathname === "/admin/venues"
                    ? activeBg
                    : "rgba(255,255,255,0.15)",
                color: "white",
              }}
              onClick={() => handleNavigate("/admin/venues")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/venues" ? activeBg : hoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/venues"
                    ? activeBg
                    : "rgba(255,255,255,0.15)")
              }
            >
              <span className="nav-icon">
                <i className="fas fa-plus"></i>
              </span>
              Create new Venue
            </button>

            {/* Active Sessions */}
            <button
              className="nav-item"
              style={{
                background:
                  location.pathname === "/admin/active"
                    ? activeBg
                    : "rgba(255,255,255,0.15)",
                color: "white",
              }}
              onClick={() => handleNavigate("/admin/active")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/active"
                    ? activeBg
                    : hoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/active"
                    ? activeBg
                    : "rgba(255,255,255,0.15)")
              }
            >
              <span className="nav-icon">
                <i className="fas fa-check-circle"></i>
              </span>
              Active Sessions
            </button>

            {/* Past Sessions */}
            <button
              className="nav-item"
              style={{
                background:
                  location.pathname === "/admin/past"
                    ? activeBg
                    : "rgba(255,255,255,0.15)",
                color: "white",
              }}
              onClick={() => handleNavigate("/admin/past")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/past"
                    ? activeBg
                    : hoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/past"
                    ? activeBg
                    : "rgba(255,255,255,0.15)")
              }
            >
              <span className="nav-icon">
                <i className="fas fa-clock"></i>
              </span>
              Past Sessions
            </button>

            {/* Inventory */}
            <button
              className="nav-item"
              style={{
                background:
                  location.pathname === "/admin/inventories"
                    ? activeBg
                    : "rgba(255,255,255,0.15)",
                color: "white",
              }}
              onClick={() => handleNavigate("/admin/inventories")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/inventories"
                    ? activeBg
                    : hoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/inventories"
                    ? activeBg
                    : "rgba(255,255,255,0.15)")
              }
            >
              <span className="nav-icon">
                <i className="fas fa-boxes"></i>
              </span>
              Venue Inventory
            </button>

            {/* Create News */}
            <button
              className="nav-item"
              style={{
                background:
                  location.pathname === "/admin/news"
                    ? activeBg
                    : "rgba(255,255,255,0.15)",
                color: "white",
              }}
              onClick={() => handleNavigate("/admin/news")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/news" ? activeBg : hoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  location.pathname === "/admin/news"
                    ? activeBg
                    : "rgba(255,255,255,0.15)")
              }
            >
              <span className="nav-icon">
                <i className="fas fa-newspaper"></i>
              </span>
              Create News
            </button>
          </div>
        </div>

        <p className="sidebar-footer">Copyright &copy; by Kaiden-A</p>
      </nav>

      {/* Overlay (mobile) */}
      {isActive && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default AdminSidebar;
