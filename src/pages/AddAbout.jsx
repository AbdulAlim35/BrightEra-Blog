import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import abconDatabas from '../app/abconDatabas';


function AddAbout() {
  const{register, handleSubmit, setValue} = useForm();
  const [about, setAbout] = useState(null)
 useEffect(() => {
    const fetchData = async () => {
      const res = await abconDatabas.listQuery();
      if (res) {
        setAbout(res);
        setValue("title", res.title);
        setValue("content", res.content);
        setValue("linkedin", res.linkedin);
        setValue("github", res.github);
      }
    };
    fetchData();
  }, [setValue]);


   const onSubmit = async (data) => {
    if (about) {
      // Update if document exists
      const updated = await abconDatabas.updatePost(about.$id, data);
    } else {
      // Create if no existing document
      const created = await abconDatabas.creatPost(data);
      setAbout(created); // set as existing now
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
  <h2 className="text-2xl font-bold mb-6 text-blue-800">Update About Page</h2>

  <form method="POST" className="space-y-5"onSubmit={handleSubmit(onSubmit)}>
    {/* <!-- Intro --> */}
    <div>
      <label for="intro" className="block font-medium text-gray-700 mb-1">Intro</label>
      <textarea id="title" rows="3" placeholder="Hi! I'm Abdul Alim..."
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("title", { required: true })}></textarea>
    </div>

    {/* <!-- Why Blog --> */}
    <div>
      <label for="whyBlog" className="block font-medium text-gray-700 mb-1">Why This Blog?</label>
      <textarea id="content" rows="3"
        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("content", { required: true })}></textarea>
    </div>

    {/* <!-- LinkedIn & GitHub --> */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="linkedinUrl" className="block font-medium text-gray-700 mb-1">LinkedIn URL</label>
        <input type="url" id="linkedin" placeholder="https://linkedin.com/in/..."
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  {...register("linkedin", { required: true })}/>
      </div>

      <div>
        <label for="githubUrl" className="block font-medium text-gray-700 mb-1">GitHub URL</label>
        <input type="url" id="github" placeholder="https://github.com/..."
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  {...register("github", { required: true })}/>
      </div>
    </div>
    {/* <!-- Submit Button --> */}
    <div>
      <button type="submit"
        className="bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-700 transition">
        Save About Page
      </button>
    </div>
  </form>
</div>

  )
}

export default AddAbout