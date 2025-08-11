import React, { useState } from "react";
import { useForm } from "react-hook-form";
import getInTouchDatabas from "../app/getInTouchDatabas";

function GetInTouch() {
  const { register, handleSubmit, reset} = useForm();
  const [getin, setGetin] = useState([]);

   const onSubmit = async (data) => {
    if (getin && getin.$id) {
      // Update if document exists
      const updated = await getInTouchDatabas.updatePost(getin.$id, data);
      console.log("Updated:", updated);
    } else {
      // Create if no existing document
      const created = await getInTouchDatabas.creatPost(data);
      console.log("Created:", created);
      setGetin(created); // set as existing now
    }
    reset();
  };

  return (
    <form
      className="bg-white p-8 rounded-xl shadow-md border border-gray-200 max-w-xl mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold text-blue-900 mb-6">
        Get In Touch Form Submissions
      </h2>

      {/* Icone */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Icone</label>
        <input
          type="text"
          id="icone"
          placeholder="Enter your icone...."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("icone", { required: true })}
        />
      </div>

      {/* Heading */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Heading</label>
        <input
          type="text"
          id="heading"
          placeholder="Enter your Heading...."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("heading", { required: true })}
        />
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter your Title...."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("title", { required: true })}
        />
      </div>
          <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Sub Title</label>
        <input
          type="text"
          id="subtitle"
          placeholder="Enter your subtitle...."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("subtitle", { required: true })}
        />
      </div>

      {/* save */}
      <button
        type="submit"
        className=" bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Save
      </button>
    </form>
  );
}

export default GetInTouch;
