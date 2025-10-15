import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import databasesService from "../app/databasesService";
import storageService from "../app/storageService";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from "react-router-dom";

function AddBlog() {
    let { id } = useParams();
    const navigate = useNavigate()
  
    useEffect(()=>{
      if (id) {
      featchData();
    }   
    },[id]);

  const { register, handleSubmit, watch, setValue, reset } = useForm();

  const slugTransform = (data) => {
    if (data && typeof data == "string") {
      return data
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
  };

  const submit = async (data) => {
    const { image, ...other } = data;
    const uploadFile = await storageService.uplodFile(image);

    const prepardData = { featuredimage: uploadFile.$id ,...other};
    let upload;
    try {
         if (id) {
    upload = await databasesService.updatePost(id, prepardData)
   } else {
       upload = await databasesService.creatPost(prepardData);
   }
    if (upload) {
       toast.success('Successfully Add')
    }
      if (data.status == "draft") {
  navigate("/deshboard/das")
 }else if (data.status == "published") {
  navigate("/home/main")
  
  
 }
    } catch (error) {
      throw error
    }
  };

  const  featchData = async () =>{
    const get = await databasesService.getPost(id);
    setValue("title", get.title);
    setValue("slug", get.slug);
    setValue("category", get.category);
    setValue("content", get.content);
    setValue("image-upload", get["image-upload"]);
    setValue("status", get.status);

    
  }
  const handleCancle = () => {
    reset({
      title:"",
      slug:"",
      content:"",
      category:"",
      status:"",
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
        <p className="text-gray-600 mt-2">
          Share your thoughts with the Capritech community
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form className="space-y-6" onSubmit={handleSubmit(submit)}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Blog Title *
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your blog title"
              {...register("title", { required: true })}
              onChange={(e) => {
                let data = slugTransform(e.target.value);

                setValue("title", e.target.value);
                setValue("slug", data);
              }}
              
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              URL Slug *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                capritech.com/blog/
              </span>
              <input
                type="text"
                id="slug"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="auto-generated-from-title"
                value={watch("slug")}
                {...register("slug", { required: true })}
                
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content *
            </label>
            <div className="border border-gray-300 rounded-lg">
              <div className="flex items-center space-x-2 p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                >
                  <i className="fas fa-bold"></i>
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                >
                  <i className="fas fa-italic"></i>
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                >
                  <i className="fas fa-underline"></i>
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                >
                  <i className="fas fa-list-ul"></i>
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                >
                  <i className="fas fa-list-ol"></i>
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                >
                  <i className="fas fa-link"></i>
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                >
                  <i className="fas fa-image"></i>
                </button>
              </div>
              <textarea
                id="content"
                rows="12"
                className="w-full px-3 py-2 border-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your blog content here..."
                {...register("content", { required: true })}
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors duration-200">
              <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
              <div className="text-sm text-gray-600">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700 font-medium">
                    Click to upload
                  </span>
                  or drag and drop
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setValue("image", e.target.files[0]);
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("category", { required: true })}
            >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
            
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                   {...register("status", { required: true })}
                />
                <span className="ml-2 text-sm text-gray-700">Save as Draft</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                    {...register("status", { required: true })}
                />
                <span className="ml-2 text-sm text-gray-700">Publish Now</span>

              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="highlight"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                    {...register("status", { required: true })}
                />
                <span className="ml-2 text-sm text-gray-700">Highlight & Publish</span>

              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              onClick={handleCancle}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
            >
              <i className="fas fa-save mr-2"></i>
              Save Blog Post
            </button>
          </div>
        </form>
      </div>
       <Toaster position="top-right" />
    </div>
  );
}

export default AddBlog;
