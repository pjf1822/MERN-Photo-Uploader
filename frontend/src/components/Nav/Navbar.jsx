import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import logoThing from "../../photo-gallery-logo-zip-file/png/logo-color-copy.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/users/me");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;

  return (
    <header>
      <div className={classes.userInfo}>
        <div className={classes.nameWrapper}>
          <h1 className={classes.name}> {user.username.toUpperCase()}</h1>
        </div>
      </div>
      <nav className={classes.nav}>
        <Link className={classes.updatePasswordLink} to="/edit-profile">
          Edit Profile
        </Link>
        <Link className={classes.updatePasswordLink} to="/update-password">
          Update Password
        </Link>
        <button type="button" className={classes.logout} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
