import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import databasesService from "../app/databasesService";
import storageService from "../app/storageService";
import { useForm } from "react-hook-form";
import { Query } from "appwrite";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { register, watch } = useForm();
  const search = watch("search");
  const [selected, setSelected] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPearPage = 4;

  useEffect(() => {
    const fetchBlogs = async () => {
      let list = await databasesService.listPost();
      setBlogs(list.documents);
    };
    fetchBlogs();
    searchData();
  }, [selected, search]);

  const onDelete = async (data) => {
    await databasesService.dealetePost(data);
    toast.success("Successfully Delete");

    let list = await databasesService.listPost();
    setBlogs(list.documents);
  };
  const onEdit = (e) => {
    let postId = e.$id;
    navigate("/deshboard/edit-blog/" + postId);
  };
  const searchData = async () => {
    const queries = [];
    if (selected && selected !== "all") {
      queries.push(Query.equal("category", selected));
    }
    if (search) {
      queries.push(Query.search("title", search));
    }
    const lisi = await databasesService.listQuery(queries);
    setBlogs(lisi.documents);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Capritech Blog Posts
          </h1>
          <p className="text-gray-600 mt-2">Manage all your blog content</p>
        </div>
        <Link
          to={"/deshboard/add-blog"}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          New Blog Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              id="search"
              type="text"
              placeholder="Search blogs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("search")}
            />
          </div>

          <div className="relative">
            <i className="fas fa-filter absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <select className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="relative">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  image
                </th>
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
                    <div className="flex items-center">
                      <img
                        src={storageService.getFilePreview(data.featuredimage)}
                        alt="Blog"
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4  ">
                    <div className="text-sm text-gray-900 line-clamp-1">
                      {data.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {data.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
                    {data.category}
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="text-sm text-gray-900 line-clamp-1">
                      {data.slug}
                    </div>
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

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing 1 to 4 of 24 blog posts
        </div>

        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-500 bg-white hover:bg-gray-50">
            Previous
          </button>

          <button>Next</button>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default BlogList;
