import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import databasesService from "../app/databasesService";
import { Query } from "appwrite";
import toast, { Toaster } from "react-hot-toast";
import { MdAdd } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setToatlBlogs] = useState(0);
  const [bloggers, setBloggers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const activeBloggers = async () => {
      const active = await databasesService.bloggersQuery();
      setBloggers(active);
    };
    activeBloggers();
    promise();
  }, []);
  const promise = async () => {
    const queries = [];
    queries.push(Query.orderDesc("$createdAt"), Query.limit(3));
    const push = await databasesService.listQuery(queries);
    setBlogs(push.documents);
  };
  const onDelete = async (data) => {
    await databasesService.dealetePost(data);
    toast.success("Successfully Delete");
    promise();
  };
  const onEdit = (e) => {
    const Id = e.$id;
    navigate("/deshboard/edit-blog/" + Id);
  };
  useEffect(() => {
    const total = async () => {
      const count = await databasesService.blog();
      setToatlBlogs(count);
    };
    total();
  }, []);

  return (
    <div className="flex h-screen">
      <main className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Capritech Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's what's happening with your blog.
            </p>
          </div>
          <Link
            to="/deshboard/add-blog"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            New Blog Post
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {totalBlogs}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <FaFileAlt className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Bloggers</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                    {bloggers}
                    </p>
                  </div>
                 <div className="p-3 rounded-lg bg-green-100">
                    <FaUserFriends className="text-green-600 text-xl" />
                    </div>
                </div>
           
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">15,420</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <FaEye className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Monthly Growth
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">12.5%</p>
                <p className="text-sm mt-2 flex items-center text-green-600">
                  <FaChartLine />
                  +2.5% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <i className="fas fa-chart-line "></i>
                <FaChartLine className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Blog Posts
              </h2>
              <Link
                to="/deshboard/blog"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((data) => (
                  <tr key={data.$id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">
                        {data.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{data.status}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 uppercase">
                        {data.category}
                      </span>
                    </td>
                  <td className="px-6 py-4 ">
                    <div className="text-sm text-gray-900 line-clamp-1">{data.slug}</div>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                          title="Edit"
                          onClick={() => {
                            onEdit(data);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100 transition-colors duration-200 cursor-pointer"
                          title="Delete"
                          onClick={() => onDelete(data.$id)}
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/deshboard/add-blog"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
                <MdAdd className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Create New Post
                </h3>
                <p className="text-gray-600">Start writing a new blog post</p>
              </div>
            </div>
          </Link>

          <Link
            to="/deshboard/blog"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-200">
                <FaFileAlt className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Manage Posts
                </h3>
                <p className="text-gray-600">Edit and organize your content</p>
              </div>
            </div>
          </Link>

          <Link
            to="/deshboard/profile"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-200">
                <FaUserFriends className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Profile Settings
                </h3>
                <p className="text-gray-600">Update your account information</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default Dashboard;
