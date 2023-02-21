import React from "react";
import EditProfileForm from "../components/profile/EditProfileForm";
import classes from "../components/profile/EditProfileForm.module.scss";

const EditProfile = () => {
  return (
    <div className={classes.editProfilePageWrapper}>
      <div className={classes.editProfileFormBackground}></div>
      <EditProfileForm />
    </div>
  );
};

export default EditProfile;
