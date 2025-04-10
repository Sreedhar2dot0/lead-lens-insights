
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  return (
    <div className="min-h-screen bg-finance-gray-lightest">
      <Navbar />
      <main className={`${isHome ? '' : 'container py-8'}`}>
        <Outlet />
      </main>
    </div>
  );
};
