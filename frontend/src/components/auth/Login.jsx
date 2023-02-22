import React, { useEffect, useState } from "react";
import classes from "./AuthForm.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios.post("/api/auth/login", {
        email,
        password,
      });
      toast.success("Logged In successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("login failed");
    }
  };
  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Login</h1>
      <form className={classes.authForm} onSubmit={login}>
        <label style={{ textAlign: "center" }} htmlFor="email">
          Email:
          <input
            name="email"
            id="email"
            type="email"
            placeholder="email"
            required
            style={{}}
          />
        </label>
        <br />
        <label style={{ textAlign: "center" }} htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          />
        </label>
        <br />
        <button className={classes.loginButton} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
