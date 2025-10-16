import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../contex/TheemProvider";
import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
  const { register, handleSubmit, reset } = useForm();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logo } = useTheme();
  const onSubmit = async (data) => {
    const search = data.search.trim();
    if (search) {
      navigate(`/search/${search}`);
    }
    reset();
  };
  const handleClick = () => {
    window.scrollTo(0, 0);
    setOpen(false);
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
                to="/"
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
            <button
              className="text-gray-500 text-2xl hover:text-gray-900 focus:outline-none"
              onClick={() => setOpen(!isOpen)}
            >
              <RxHamburgerMenu />
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div
          id="mobile-menu"
          className={`md:hidden bg-white border-t overflow-hidden transition-all duration-700 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              onClick={() => handleClick("/")}
              to="/"
              className="block px-3 py-2 text-gray-700 "
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => handleClick("/all")}
              to="/all"
              className="block px-3 py-2 text-gray-700 "
            >
              All Ariticles
            </NavLink>
            <NavLink
              onClick={() => handleClick("/nev/technology")}
              to="/nev/technology"
              className="block px-3 py-2 text-gray-700 "
            >
              Technology
            </NavLink>
            <NavLink
              onClick={() => handleClick("/nev/Development")}
              to="/nev/Development"
              className="block px-3 py-2 text-gray-700 "
            >
              Development
            </NavLink>
            <NavLink
              onClick={() => handleClick("/about")}
              to="/about"
              className="block px-3 py-2 text-gray-700 "
            >
              About
            </NavLink>
            <NavLink
              onClick={() => handleClick("/contact")}
              to="/contact"
              className="block px-3 py-2  text-gray-700"
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
