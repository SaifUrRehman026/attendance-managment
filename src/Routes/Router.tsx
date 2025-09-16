import { Routes, Route } from "react-router-dom";
// import App from "@/App";
// import { LoginSection } from "@/app/LoginPage/LoginPage";
import Layout from "@/Layout/Layout";
// import  Home  from "@/app/HomePage/Home";
import  MyLeaves  from "@/app/MyLeavesPage/MyLeaves";
import { Login } from "@/app/LoginPage/Login";


function AppRouter() {
  return (
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
      {/* <Route path="/login" element={<LoginSection />} /> */}
      <Route element={<Layout/>}>
        <Route path="/" element={<h1>Hello World</h1>} />
      <Route path="/Home" element={<Login />} />
      <Route path="/MyLeaves" element={<MyLeaves />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
