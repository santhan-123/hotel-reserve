import React from "react";
import { Link } from "react-router-dom";


function Navbar() {
  let user = null;
  try {
    const storedUser = localStorage.getItem("currentUser");
    user =
      storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Failed to parse currentUser from localStorage", err);
    user = null;
  }
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="\home">
            Our Rooms
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i class="fa fa-bars" style={{ color: "white" }}></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-15">
              {user ? (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa fa-user"></i>
                      {user.data.name}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="\bookings">
                          Profile
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#" onClick={logout}>
                          Logout
                        </a>
                      </li>

                      {user.data.isAdmin && (
                        <li>
                          <Link className="dropdown-item" to="/admin">
                            Admin
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link " href="\register">
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="\login">
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
