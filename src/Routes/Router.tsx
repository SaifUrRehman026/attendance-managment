import { Routes, Route } from "react-router-dom";
// import App from "@/App";
// import { LoginSection } from "@/app/LoginPage/LoginPage";

import  Home  from "@/app/HomePage/Home";
import  MyLeaves  from "@/app/MyLeavesPage/MyLeaves";

function AppRouter() {
  return (
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
      {/* <Route path="/login" element={<LoginSection />} /> */}
        <Route path="/" element={<h1>Hello World</h1>} />
      <Route path="/Home" element={<Home />} />
      <Route path="/MyLeaves" element={<MyLeaves />} />
    </Routes>
  );
}

export default AppRouter;
