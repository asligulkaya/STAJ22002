import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/contactLogo.png";
import logoutIcon from "../../assets/svg/logout.svg";
import classes from "./Header.module.css";
import { logout, hasPermission } from "../../utils/auth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const isAdmin = hasPermission("admin");
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Failed to logout: ", error.message);
    }
  };

  const userPhoto = storedUserData?.base64Photo || "https://placehold.co/50";
  const username = storedUserData?.username || "Guest";

  return (
    <nav
      className={`${classes.nav} navbar navbar-expand-lg navbar-light bg-transparent`}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={toggleNavbar}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" style={{ width: "48px" }} />
      </Link>

      <div
        className={`collapse navbar-collapse justify-content-between ${
          isOpen ? "show" : ""
        }`}
        id="navbarTogglerDemo03"
      >
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/messages">
              Messages
            </Link>
          </li>
          {isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reports">
                  Reports
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="dropdown">
          <Link
            className={`btn dropdown-toggle ${classes.dropdownToggle}`}
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={toggleProfile}
          >
            <img
              src={userPhoto}
              className={`rounded-circle ${classes.profile}`}
            />
          </Link>

          <div
            className={`dropdown-menu border-0 ${
              openProfile ? `${classes.dropdownMenu} show` : ""
            }`}
            aria-labelledby="dropdownMenuLink"
          >
            <h5 className={`dropdown-item text-center`} href="/">
              {username}
            </h5>
            {storedUserData && (
              <button
                className="dropdown-item"
                href="/"
                style={{ textAlign: "center" }}
                onClick={handleLogout}
              >
                Logout <img src={logoutIcon} width="20px" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
