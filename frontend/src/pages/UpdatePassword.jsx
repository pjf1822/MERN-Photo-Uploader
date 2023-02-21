import React from "react";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import classes from "../components/UpdatePasswordForm.module.scss";
const UpdatePassword = () => {
  return (
    <div className={classes.updatePasswordPageWrapper}>
      <div className={classes.updatePageBackgroundImage}></div>
      <UpdatePasswordForm />
    </div>
  );
};

export default UpdatePassword;
