import React from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Layout from "../components/Layout";
import classes from "./Auth.module.scss";

const Auth = () => {
  return (
    <Layout>
      <div className={classes.authPageWrapper}>
        <div className={classes.form_container_pic}></div>
        <div className={classes.form_container}>
          <Login />
          <div
            style={{
              widht: "90%",
              height: "2px",
              backgroundColor: "rgb(20,150,220)",
              margin: "30px 0px",
            }}
          ></div>
          <Register />
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
