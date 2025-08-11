import React, { useState, useEffect } from "react";
import abconDatabas from "../../app/abconDatabas";
import { Link } from "react-router-dom";

function About() {
  const [post, setPost] = useState([])
 useEffect(() => {
    const feacth = async () => {
    const sent = await abconDatabas.listQuery()
    setPost(sent); 
  }
  feacth();
 }, [])
 
  return (
    <>
      <section className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          </div>
        </div>
      </section>

      {/* <!-- Main Content --> */}
      {post &&(
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <div className="prose prose-lg max-w-none">
             <h2 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
             {post.title}
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              {post.content}
            </p>
            <h2 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Want to stay updated?
              <br />
              👉 Follow me on{" "}
              {post.linkedin &&(
              <a
                href={post.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                LinkedIn
              </a>
              )}
              {" "}
              and{" "}
              {post.github &&(
              <a
                href={post.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                GitHub
              </a>
              )}
              , or{" "}
              <Link
                to="/home/contact"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                contact me here
              </Link>
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8">
              <p className="text-blue-900 font-medium text-lg">
                Thanks for visiting!
              </p>
            </div>
          </div>
        </div>
      </main>
      )}
    </>
  );
}

export default About;
