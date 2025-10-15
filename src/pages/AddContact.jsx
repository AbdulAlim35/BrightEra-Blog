import React, { useState, useEffect } from "react";
import contactDatabas from "../app/contactDatabas";

function AddContact() {
  const [post, setPost] = useState([])
  useEffect(() => {
   const featch = async () => {
    const list = await contactDatabas.listMessage() 
    setPost(list.documents)
   }
   featch();
  }, [])
  
  return (
    <>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* <!-- Contact Form Submissions --> */}
       
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 overflow-y-auto max-h-[80vh] scrollbar-hide">
          

          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Contact Form Submissions
          </h2>

          {/* <!-- Sample Submission 1 --> */}
          {post.map((data)=>(
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              
              <div>
                <h3 className="font-semibold text-gray-900">{data.name}</h3>
                <p className="text-sm text-gray-600">{data.email}</p>
                <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {data.catagory}
                </span>
              </div>
                <p className="text-sm text-gray-500"> {new Date(data.$createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 text-sm leading-relaxed">
                {data.message}
              </p>
            </div>
            <div className="flex space-x-2 mt-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Reply
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Mark as Read
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Archive
              </button>
            </div>
          </div>
          ))}
        </div>
        {/* <!-- Contact Statistics and Actions --> */}
        <div className="space-y-8">
          {/* <!-- Statistics Cards --> */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Contact Statistics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-600">
                      Total Messages
                    </p>
                    <p className="text-xl font-bold text-blue-900">247</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-yellow-600">Pending</p>
                    <p className="text-xl font-bold text-yellow-900">23</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-600">Responded</p>
                    <p className="text-xl font-bold text-green-900">198</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-600">Archived</p>
                    <p className="text-xl font-bold text-red-900">26</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
 

    </>
  );
}

export default AddContact;
