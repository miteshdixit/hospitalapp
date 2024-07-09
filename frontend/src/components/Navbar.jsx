/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburger, GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/patient/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setAuthenticated(false);
      navigate("/"); // Optionally navigate to home page after logout
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred during logout");
    }
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <nav className="container">
      <div className="logo">MaxCare</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>HOME</Link>
          <Link to={"/appointment"}>APPOINTMENT</Link>
          <Link to={"/about"}>ABOUT US</Link>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <button className="loginBtn btn" onClick={gotoLogin}>
            LOGIN
          </button>
        )}
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        
        <GiHamburgerMenu/>
      </button>
    </nav>
  );
}

export default Navbar;
