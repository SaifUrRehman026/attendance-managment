// src/Routes/Router.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/Layout/Layout";
import { MyLeaves } from "@/app/MyLeavesPage/MyLeaves";
import { Login } from "@/app/LoginPage/Login";
import Home from "@/app/HomePage/Home";
import { ProtectedRoute } from "@/components/protectedRoute";
import { useAuth } from "@/context/AuthContext";

function AppRouter() {
  const { token, loading } = useAuth(); 
  const isLoggedIn = !!token;

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/Home" element={<Home />} />
        <Route path="/MyLeaves" element={<MyLeaves />} />
      </Route>

      
      <Route
        path="*"
        element={
          isLoggedIn ? <Navigate to="/Home" replace /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default AppRouter;
