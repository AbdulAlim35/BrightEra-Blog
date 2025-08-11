import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import settingDatabas from "../app/settingDatabas";

function AddSeting() {
  const { register, handleSubmit, setValue } = useForm();
  const [upload, setUpload] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await settingDatabas.settingQuery();
      if (res) {
        setUpload(res);
        setValue("logo", res.logo);
        setValue("text", res.text);
      }
    };
    fetchData();
  }, [setValue]);

  const onSubmit = async (data) => {
    if (upload && upload.$id) {
      // Update if document exists
      const updated = await settingDatabas.updateSetting(upload.$id, data);
    } else {
      // Create if no existing document
      const created = await settingDatabas.creatSetting(data);
      console.log(created);

      setUpload(created); // set as existing now
    }
  };
  return (
    <section class="min-h-screen  p-6">
      <div class="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Admin Info Form</h2>
        <form class="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* <!-- Logo --> */}
          <div>
            <label class="block text-gray-700 font-medium mb-1">
              Logo Text
            </label>
            <input
              type="text"
              name="logo"
              class="w-full border border-gray-300 rounded-md p-3"
              placeholder="Enter Logo Text"
              {...register("logo", { required: true })}
            />
          </div>

          {/* <!-- Title --> */}
          <div>
            <label class="block text-gray-700 font-medium mb-1">Text</label>
            <textarea
              name="text"
              rows="5"
              class="w-full border border-gray-300 rounded-md p-3"
              placeholder="Enter Text"
              {...register("text", { required: true })}
            ></textarea>
          </div>
          {/* <!-- Submit Button --> */}
          <button
            type="submit"
            class=" bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddSeting;
