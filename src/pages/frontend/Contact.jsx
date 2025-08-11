import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import contactDatabas from "../../app/contactDatabas";
import getInTouchDatabas from "../../app/getInTouchDatabas";
import { useTheme } from "../../contex/TheemProvider";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";

function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const [post, setPost] = useState(null);
  const { icone } = useTheme();
  const [touch, setTouch] = useState([]);

  const onSubmit = async (data) => {
    if (post) {
      // Update if document exists
      const updated = await contactDatabas.updateMessage(post.$id, data);
    } else {
      // Create if no existing document
      const created = await contactDatabas.creatMessage(data);
      setPost(created); // set as existing now
    }
    reset();
  };
  const icons = {
    facebook: <FaFacebook className="inline mr-1" />,
    twitter: <FaTwitter className="inline mr-1" />,
    linkedin: <FaLinkedin className="inline mr-1" />,
    github: <FaGithub className="inline mr-1" />,
  };
  useEffect(() => {
    const featch = async () => {
      const sent = await getInTouchDatabas.listPost();
      setTouch(sent.documents);
    };
    featch();
  }, []);
  const iconMap = {
    ...FaIcons,
    ...FiIcons,
  };

  return (
    <>
      <section className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Have a question or want to collaborate? We'd love to hear from
              you.
            </p>
          </div>
        </div>
      </section>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* <!-- Contact Form --> */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Send us a Message
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name.."
                  {...register("name", { required: true })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email..."
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your project or question..."
                  {...register("message", { required: true })}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="catagory"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("catagory", { required: true })}
                >
                  <option value="" disabled selected hidden>
                    -- Select a category --
                  </option>
                  <option>General Inquiry</option>
                  <option>Collaboration</option>
                  <option>Guest Post</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* <!-- Contact Information --> */}
          <div className="space-y-8">
            {/* <!-- Contact Details --> */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                Get in Touch
              </h2>
              {touch.map((data) => {
                const iconName = data.icone?.trim();
                const IconComponent = iconMap[iconName]; // এখানে icone string যেমন "FaMapMarkerAlt"
                return (
                  <div className="space-y-6 mb-6" key={data.$id}>
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        {IconComponent && (
                          <IconComponent className="text-blue-600 w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {data.heading}
                        </h3>
                        <p className="text-gray-600">{data.title}</p>
                        <p className="text-gray-600">{data.subtitle}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <!-- Social Links --> */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                Follow Us
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {icone?.sociallink &&
                  JSON.parse(icone.sociallink).map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg shadow hover:bg-blue-100 transition-all duration-300"
                    >
                      <span className="text-2xl text-blue-700">
                        {icons[item.type]}
                      </span>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
