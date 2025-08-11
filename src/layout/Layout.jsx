import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import Logout from "../components/Logout";
import { FaPenNib } from "react-icons/fa";
import { useTheme } from "../contex/TheemProvider";
import storageService from "../app/storageService";

export default function Layout() {
  const { authInfo, imageId } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-slate-900 text-white overflow-y-auto max-h-[100vh] scrollbar-hide">
        <div className="flex flex-col h-full">
          <div className="flex items-center p-6 border-b border-slate-700">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <FaPenNib className="text-white" />
            </div>
            <h1 className="text-xl font-bold">Capritech Admin</h1>
          </div>

          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <img
                src={storageService.getFilePreview(imageId)}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{authInfo.name}</p>
                <p className="text-sm text-slate-400">{authInfo.email}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/deshboard/das"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/deshboard/blog"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  All Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/deshboard/add-blog"
                  className="flex items-center px-4 py-3 rounded-lg  text-white"
                >
                  Add Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/deshboard/addabout"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Add About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/deshboard/addcontact"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                  onClick={() => setOpen(!open)}
                >
                  Add Contact
                  <span
                    className={`transform transition-transform ${
                      open ? "rotate-90" : ""
                    }`}
                  >
                    ▸
                  </span>
                </NavLink>
                {open && (
                  <ul className="ml-6 mt-2 space-y-2 ">
                    <li>
                      <NavLink
                        to="/deshboard/addcontact/getintouch"
                        className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                      >
                        ▸ Get In Touch
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink
                  to="/deshboard/addhero"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Add Hero
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/deshboard/addseting"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Add Seting
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/deshboard/addicone"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Add Icone
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/deshboard/profile"
                  className="flex items-center px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-slate-700">
            <Logout />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
