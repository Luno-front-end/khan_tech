import { Admin } from "./components/Admin";
import { Client } from "./components/Client";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Client />} />
      <Route path="/admin-panel" element={<Admin />} />
    </Routes>
  );
};
