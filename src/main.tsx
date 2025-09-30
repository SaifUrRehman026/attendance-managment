import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import AppRouter from './Routes/Router'
import { AuthProvider } from "@/context/AuthContext";

createRoot(document.getElementById('root')!).render(
     <BrowserRouter>
       <AuthProvider>   {/* ✅ Wrap your whole app here */}
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
,
)
