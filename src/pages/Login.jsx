import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, replace, useLocation, useNavigate, useParams } from "react-router-dom";
import authService from "../app/authService";
import { useTheme } from "../contex/TheemProvider";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { isAuth, setAuth } = useTheme();
   
  
  useEffect(() => {
  
    if (isAuth) {
     navigate("/deshboard/das",{replace:true});
     
    }
  }, [isAuth]);
  const onSubmit = async (data) => {
    const session = await authService.logIn(data, setError);
    if (session) {
      setAuth(true);
      reset();
       localStorage.setItem("authUser", JSON.stringify(true))
      
     navigate("/deshboard/das");

    
    }
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full">
              <i className="fas fa-blog text-white text-2xl"></i>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome to Capritech</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your admin account
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message} </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i className="fas fa-eye text-gray-400"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Sign in to Capritech
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?
                <Link
                  to={"register"}
                  className="font-medium text-blue-600 hover:text-blue-500 ml-1"
                >
                  {" "}
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2025 BrightEra. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
