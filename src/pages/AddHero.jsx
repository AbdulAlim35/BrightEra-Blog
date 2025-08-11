import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import heroDatabas from "../app/heroDatabas";
import storageService from "../app/storageService";

function AddHero() {
  const { register, handleSubmit, setValue } = useForm();
  const [hero, setHero] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await heroDatabas.heroQuery();
      if (res) {
        setHero(res);
        setValue("title", res.title);
        setValue("contant", res.contant);
      }
    };
    fetchData();
  }, [setValue]);
  const onSubmit = async (data) => {
    try {
         if (hero && hero.$id) {
      // Update if document exists
      const updated = await heroDatabas.updatehero(hero.$id, data);
    } else {
      // Create if no existing document
      const created = await heroDatabas.creathero(data);
      setHero(created); // set as existing now
    }
    } catch (error) {
      throw error
    }
 
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Update Hero section</h2>

      <form method="POST" className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* <!-- Intro --> */}
        <div>
          <label for="title" className="block font-medium text-gray-700 mb-1">
            title
          </label>
          <textarea
            id="title"
            rows="3"
            placeholder="Enter your title..."
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", { required: true })}
          ></textarea>
        </div>

        {/* <!-- Why Blog --> */}
        <div>
          <label for="contant" className="block font-medium text-gray-700 mb-1">
            content
          </label>
          <textarea
            id="contant"
            rows="3"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("contant", { required: true })}
          ></textarea>
        </div>
        {/* <!-- Submit Button --> */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save About Page
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddHero;
