import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../app/authService";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    delete data.confirm_password;
    const sent = await authService.cerateAccount(data);
    reset();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full">
              <i className="fas fa-blog text-white text-2xl"></i>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Join Capritech</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your admin account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <label
                  for="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Please enter your first name.",
                  })}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message} </span>
                )}
              </div>

              <div>
                <label
                  for="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <input
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email field is required",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message} </span>
                )}
              </div>

              <div>
                <label
                  for="password"
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
                    {...register("password", {
                      required: {
                        value: true,
                        message: "password field is required",
                      },
                      minLength: {
                        value: 8,
                        message: "Password minimum 8 character",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}{" "}
                    </span>
                  )}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <i className="fas fa-eye text-gray-400"></i>
                  </button>
                </div>
              </div>

              <div>
                <label
                  for="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    {...register("confirm_password", {
                      validate: (e) => {
                        let confirm = e;
                        let pass = watch("password");
                        return confirm == pass ? true : "Password is not match";
                      },
                    })}
                  />
                  {errors.confirm_password && (
                    <span className="text-red-500">
                      {errors.confirm_password.message}{" "}
                    </span>
                  )}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <i className="fas fa-eye text-gray-400"></i>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Terms and Conditions
                  </a>
                  and
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Create Capritech Account
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?
                  <Link
                    to={"/"}
                    className="font-medium text-blue-600 hover:text-blue-500 ml-1"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              © 2024 Capritech. All rights reserved.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
