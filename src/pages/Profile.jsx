import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import databasesService from "../app/databasesService";
import { FaCamera } from "react-icons/fa";
import { useTheme } from "../contex/TheemProvider";
import authService from "../app/authService";
import storageService from "../app/storageService";
import profileDatabas from "../app/profileDatabas";

function Profile() {
  const { authInfo, fatch, imageId, setImageId } = useTheme();
  const { register, handleSubmit, setValue } = useForm();
  const [authUser, setAuthUser] = useState([]);
  const [loadin, setLoding] = useState(false);

  useEffect(() => {
    setValue("name", authInfo.name);
    setValue("email", authInfo.email);
    const fatch = async () => {
      const userData = await authService.getAccount();
      setAuthUser(userData);
    };
    fatch();
  }, []);
  const pass = async () => {
    await authService.updatePassword();
  };
  const onsubmit = async (data) => {
    const newName = data.name;
    const newEmail = data.email;
    const password = data.password;
    await authService.updateName(newName);

    if (newEmail && password) {
      await authService.updateEmail({ email: newEmail, password });
    }
    fatch();
    setValue("password", "");
  };
  const setPassword = async (data) => {
    const oldpassword = data.oldpassword;
    const newpassword = data.newpassword;
    await authService.updatePassword({ oldpassword, password: newpassword });
    fatch();
    setValue("oldpassword", "");
    setValue("newpassword", "");
  };
  const handleImage = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;
    setLoding(true);
    try {
      const image = await storageService.uplodFile(selectedFile);
      let profileData = await profileDatabas.listQuery(authInfo.$id);
      if (profileData.total != 0) {
        storageService.deleteFile(imageId);
        await profileDatabas.updatePost(profileData.documents[0].$id, {
          imageId: image.$id,
          authId: authInfo.$id,
        });
        setImageId(image.$id);
      } else {
        await profileDatabas.creatPost({
          imageId: image.$id,
          authId: authInfo.$id,
        });
        setImageId(image.$id);
      }
      setLoding(false);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex h-screen">
      <main className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Capritech Profile Settings
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    {loadin && <h2>Loading...</h2>}
                    <img
                      src={storageService.getFilePreview(imageId)}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <label
                      for="avatar-upload"
                      className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FaCamera />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImage}
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mt-4">
                    {authInfo.name}
                  </h2>
                  <p className="text-gray-600">{authInfo.email}</p>
                  <div className="mt-4 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                    Capritech Admin
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">24</div>
                    <div className="text-sm text-gray-600">Blog Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      15.4K
                    </div>
                    <div className="text-sm text-gray-600">Total Views</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Personal Information
                </h3>

                <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        for="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        {...register("name")}
                      />
                    </div>

                    <div>
                      <label
                        for="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        {...register("email")}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter current password"
                      {...register("password")}
                    />
                  </div>
                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Change Password
                </h3>

                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(setPassword)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        for=" Current Password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="oldpassword "
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter Current Password"
                        {...register("oldpassword")}
                      />
                    </div>

                    <div>
                      <label
                        for="confirm-new-password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter new password"
                        {...register("newpassword")}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <i className="fas fa-key mr-2"></i>
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
