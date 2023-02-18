import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./UpdatePasswordForm.module.scss";
import { useNavigate } from "react-router-dom";

const UpdatePasswordForm = () => {
  const navigate = useNavigate();

  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("api/users/me/change_password", userPassword);
      toast.success("password updated");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassword = (e) => {
    setUserPassword({
      ...userPassword,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={classes.formWrapper}>
      <Link className={classes.backBtn} to="/">
        <h4>Home</h4>
      </Link>
      <h1 style={{ textAlign: "center" }}>Edit Password</h1>
      <form className={classes.editForm} onSubmit={updatePassword}>
        <label className={classes.formLabel} htmlFor="oldPassword">
          Old Password
          <input
            name="oldPassword"
            type="password"
            placeholder="Old Password"
            required
            value={userPassword.oldPassword}
            onChange={handlePassword}
          />
        </label>
        <label className={classes.formLabel} htmlFor="newPassword">
          new Password
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            required
            value={userPassword.newPassword}
            onChange={handlePassword}
          />
        </label>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
