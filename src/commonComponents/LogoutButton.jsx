import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { LogOut } from "lucide-react";


const LogoutButton = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

 const handleLogout = () => {
     const confirmLogout = window.confirm("Are you sure you want to log out?");
     if (confirmLogout) {
       dispatch(logout());
       navigate("/login");
     }
   };

  return (
    <button
         onClick={handleLogout}
         className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
    >
         <LogOut className="h-5 w-5" />
         <span>Logout</span>
       </button>
  )
}

export default LogoutButton
