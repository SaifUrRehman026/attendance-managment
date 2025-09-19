import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/Layout/Layout";
import {MyLeaves} from "@/app/MyLeavesPage/MyLeaves";
import { Login } from "@/app/LoginPage/Login";
import Home from "@/app/HomePage/Home";

function AppRouter() {
  const isLoggedIn = !!localStorage.getItem("token"); // true/false

  return (
    <Routes>
     
      {!isLoggedIn && (
        <Route path="/login" element={<Login />} />
      )}

      
      {isLoggedIn && (
        <Route element={<Layout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/MyLeaves" element={<MyLeaves />} />
        </Route>
      )}

      
      <Route
        path="*"
        element={
          isLoggedIn ? <Navigate to="/Home" /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default AppRouter;
