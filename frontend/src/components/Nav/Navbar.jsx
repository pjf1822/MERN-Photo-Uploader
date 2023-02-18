import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Navbar.module.scss"
import {Link } from "react-router-dom"

const Navbar = () => {
  const [user, setUser] = useState("");


  const getUser = async () => {
    try {
      const { data } = await axios.get('/api/users/me');
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <div className={classes.userInfo}>
    <div>
<h1 className={classes.name}>   {user.name}</h1>
<h1  className={classes.email}>   {user.email}</h1>
<h1  className={classes.email}>   {user.email}</h1>

<Link to="/edit-profile">Edit</Link>

    </div>


  </div>;
};

export default Navbar;
