import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

import classes from "./AuthForm.module.scss";

const Register = () => {
  const register = async (e) => {
    e.preventDefault();

    const user = {
      username: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await axios.post("/api/auth/register", user);
      toast.success("register successful");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Register</h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="name">
          Full Name:
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Full Name"
            required
          />
        </label>
        <label htmlFor="email">
          email:
          <input name="email" type="email" placeholder="email" required />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
