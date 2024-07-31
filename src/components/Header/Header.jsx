import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/contactLogo.png";
import logout from "../../assets/logout.svg";
import classes from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
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
          <li className="nav-item">
            <Link className="nav-link" to="#">
              Link
            </Link>
          </li>
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
            <img src="https://placehold.co/50" className="rounded-circle" />
          </Link>

          <div
            className={`dropdown-menu border-0 ${
              openProfile ? `${classes.dropdownMenu} show` : ""
            }`}
            aria-labelledby="dropdownMenuLink"
          >
            <h3
              className={`${classes.dropdownMenuLinks} dropdown-item`}
              href="/"
            >
              User name
            </h3>
            <Link
              className="dropdown-item"
              href="/"
              style={{ textAlign: "center" }}
            >
              Logout <img src={logout} width="20px" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
