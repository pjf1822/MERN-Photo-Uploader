import React, { useEffect, useState } from "react";
import classes from "./AuthForm.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    console.log(e.target);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios.post("/api/auth/login", {
        email,
        password,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Login</h1>
      <form className={classes.authForm} onSubmit={login}>
        <label htmlFor="email">
          email:
          <input
            name="email"
            id="email"
            type="email"
            placeholder="email"
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          password:
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
