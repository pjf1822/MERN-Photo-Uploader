import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./EditProfileForm.module.scss";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("api/users/me", user);
      console.log(res);
      toast.success("profile updated ");
      setUser(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={classes.editProfileFormWrapper}>
      <Link className={classes.backBtnWrapper} to="/">
        <h4 className={classes.backBtn}>Go Home</h4>
      </Link>
      <h1
        className={classes.editTitle}
        style={{
          textAlign: "center",
          fontSize: 30,
        }}
      >
        Edit Profile
      </h1>
      <form className={classes.editForm} onSubmit={updateProfile}>
        <label className={classes.formLabel} htmlFor="name">
          Full Name:
          <input
            name="username"
            type="text"
            placeholder="Full Name"
            required
            value={user.username}
            onChange={updateUserInfo}
            style={{ marginTop: 15 }}
          />
        </label>
        <label className={classes.formLabel} htmlFor="email">
          email:
          <input
            name="email"
            type="email"
            placeholder="email"
            required
            value={user.email}
            onChange={updateUserInfo}
            style={{ marginTop: 15 }}
          />
        </label>
        <button className={classes.updateProfileButton} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
