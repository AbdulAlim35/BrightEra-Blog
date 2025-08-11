import React from "react";
import authService from "../app/authService";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contex/TheemProvider";

function Logout() {
  const navigate = useNavigate();
  const {setAuth}=useTheme();
  const logout = () => {
    const out = authService.logOut();
    navigate("/");
    setAuth(false);
  };
  return (
    <button
      onClick={logout}
      className="flex items-center w-full px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200"
    >
      <i className="fas fa-sign-out-alt w-5 mr-3"></i>
      Logout
    </button>
  );
}

export default Logout;
