import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import iconeDatabas from "../app/iconeDatabas";

function AddIcone() {
  const [about, setAbout] = useState(null)
  const socialOptions = [
    { label: "Facebook", icon: <FaFacebook />, name: "facebook" },
    { label: "Twitter", icon: <FaTwitter />, name: "twitter" },
    { label: "LinkedIn", icon: <FaLinkedin />, name: "linkedin" },
    { label: "GitHub", icon: <FaGithub />, name: "github" },
  ];
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      links: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });
  const onSubmit = async (data) =>{
    const payload = {
    sociallink: JSON.stringify(data.links),
  };
    if (about) {
      // Update if document exists
      const updated = await iconeDatabas.updateIcone (about.$id, payload);
    } else {
      // Create if no existing document
      const created = await iconeDatabas.creatIcone(payload);
       console.log(created);
      setAbout(created); // set as existing now
      
    }


  }

  return (
    <form
      class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 class="text-2xl font-bold text-gray-800">Add Social Links</h2>

      {/* <!-- One Row --> */}
      {fields.map((field, index) => (
        <div key={field.id} class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <select
            class="w-full sm:w-1/3 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register(`links.${index}.type`)}
          >
            {socialOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            id="sociallink"
            type="url"
            placeholder="Enter your profile link..."
            class="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
           {...register(`links.${index}.url`)}
          />

          <button
            type="button"
            title="Remove"
            class="text-red-600 hover:text-red-800 transition-colors duration-200"
            onClick={() => remove(index)}
          >
            Remove
          </button>
        </div>
      ))}
      {/* <!-- Add Button --> */}
      <div>
        <button
          type="button"
          class="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
             onClick={() => append({ type: "facebook", url: "" })}
        >
          Add Social Link
        </button>
      </div>

      {/* <!-- Submit Button --> */}
      <button
        type="submit"
        class=" bg-blue-600 text-white font-semibold py-3 px-3 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
      >
        Save Links
      </button>
    </form>
  );
}

export default AddIcone;
