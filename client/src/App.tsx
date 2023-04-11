import { Admin } from "./components/Admin";
import { SignIn } from "./components/Admin/SignIn";
import { SignUp } from "./components/Admin/SignUp";
import { Client } from "./components/Client";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import { useState } from "react";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Client />} />

      <Route
        path="/admin-panel"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<SignIn />} />
      <Route path="/reg" element={<SignUp />} />
    </Routes>
  );
};
