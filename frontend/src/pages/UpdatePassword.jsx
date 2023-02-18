import React from "react";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

const UpdatePassword = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10%",
        height: "100vh",
      }}
    >
      <UpdatePasswordForm />
    </div>
  );
};

export default UpdatePassword;
