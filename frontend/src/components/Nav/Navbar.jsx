import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

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
        <FaUserAlt className={classes.userIcon} />
        <div>
          <h1 className={classes.name}> {user.name}</h1>
          <h1 className={classes.email}> {user.email}</h1>
          <Link to="/edit-profile">Edit</Link>
        </div>
      </div>
      <nav>
        <button type="button" className={classes.logout} onClick={handleLogout}>
          logout
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
