import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import PrivateRoutes from "./components/PrivateRoutes";
import UpdatePassword from "./pages/UpdatePassword";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.8rem",
          },
        }}
      />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
