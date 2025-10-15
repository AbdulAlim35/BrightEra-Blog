import React from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../contex/TheemProvider";

function Header() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { logo } = useTheme();
  const onSubmit = async (data) => {
    const search = data.search.trim();
    if (search) {
      navigate(`/search/${search}`);
    }
    reset();
  };
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">
              {logo?.logo}
            </h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink
                to="/main"
                  onClick={() => window.scrollTo(0, 0)}
                className={({ isActive }) =>
                  `relative py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-blue-500  font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-500 font-medium hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/all"
                  onClick={() => window.scrollTo(0, 0)}
                className={({ isActive }) =>
                  `relative py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-blue-500 font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-500 font-medium hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
              >
                All Ariticles
              </NavLink>
              <NavLink
                to="/nev/technology"
                  onClick={() => window.scrollTo(0, 0)}
                className={({ isActive }) =>
                  `relative py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-blue-500 font-bold  after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-500 font-medium hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
              >
                Technology
              </NavLink>
              <NavLink
                to="/nev/Development"
                  onClick={() => window.scrollTo(0, 0)}
                className={({ isActive }) =>
                  `relative py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-blue-500 font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-500 font-medium hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
              >
                Development
              </NavLink>
              <NavLink
                to="/about"
                  onClick={() => window.scrollTo(0, 0)}
                className={({ isActive }) =>
                  `relative py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-blue-500 font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-500 font-medium hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                  onClick={() => window.scrollTo(0, 0)}
                className={({ isActive }) =>
                  `relative py-2 inline-block transition-all duration-200 ${
                    isActive
                      ? "text-blue-500 font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                      : "text-gray-500 font-medium hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                  }`
                }
              >
                Contact
              </NavLink>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <input
                  id="search"
                  type="text"
                  placeholder=" Search..."
                  className="py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  {...register("search")}
                />
              </div>
            </div>
          </form>
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-900 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
