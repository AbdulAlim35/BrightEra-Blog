import React, { useState, useEffect } from "react";
import databasesService from "../../app/databasesService";
import storageService from "../../app/storageService";
import { useTheme } from "../../contex/TheemProvider";
import { Query } from "appwrite";
import { Link } from "react-router-dom";
import heroDatabas from "../../app/heroDatabas";
import { FaMapMarkerAlt } from "react-icons/fa";

function MainContent() {
  const { authInfo, imageId, categoryId } = useTheme();
  const [blog, setBlog] = useState([]);
  const [update, setUpdate] = useState([]);
  const [heihlight, setHeihlight] = useState(null);
  const [section, setSection] = useState([]);

  useEffect(() => {
    const post = async () => {
      const set = await databasesService.articles();
      setBlog(set.documents);
    };
    post();
    recent();
  }, []);
  const recent = async () => {
    const queries = [];
    queries.push(Query.orderDesc("$createdAt"), Query.limit(3));
    const main = await databasesService.listQuery(queries);
    setUpdate(main.documents);
  };
  useEffect(() => {
    const featch = async () => {
      const sent = await databasesService.oneQuery();
      setHeihlight(sent.documents[0]);
    };
    featch();
  }, []);

  useEffect(() => {
    const hero = async () => {
      const data = await heroDatabas.heroQuery();

      setSection(data);
    };
    hero();
  }, []);

  return (
    <>
      {section && (
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-blue-800 bg-opacity-50 z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center relative z-20">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {section.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                {section.contant}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={"/about"}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  About us
                </Link>
                <Link
                  to={"/contact"}
                  className=" flex items-center md:justify-end justify-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <FaMapMarkerAlt />
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* <!-- Highlight Post --> */}

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Highlight Article
          </h2>
          {heihlight && (
            <div className="blog-card p-0  transform transition duration-500 hover:scale-105 ">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {heihlight?.featuredimage && (
                    <img
                      src={storageService.getFilePreview(
                        heihlight.featuredimage
                      )}
                    />
                  )}
                </div>

                <div className="md:w-1/2 p-8  ">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ">
                      {heihlight.category?.charAt(0).toUpperCase() + heihlight.category?.slice(1)}
                    </span>
                    <span className="text-gray-500 text-sm ml-4 ">
                      {new Date(heihlight.$createdAt).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-blue-900">
                    <Link
                      to={"/show/" + heihlight.$id}
                      className="hover:text-blue-600 transition-colors line-clamp-1 "
                    >
                      {heihlight.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-5">
                    {heihlight.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={storageService.getFilePreview(imageId)}
                        alt="Author"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {authInfo.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* <!-- Blog Posts --> */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Latest Articles
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* <!-- Blog Post 1 --> */}
              {blog.map((data) => (
                <article
                  key={data.$id}
                  className="blog-card transform transition duration-500 hover:scale-105"
                >
                  <img
                    src={storageService.getFilePreview(data.featuredimage)}
                    alt="Web Development"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded ">
                        {data.category?.charAt(0).toUpperCase() + data.category.slice(1)}
                      </span>
                      <span className="text-gray-500 text-sm ml-3">
                        {new Date(data.$createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-blue-900">
                      <Link
                        to={"/show/" + data.$id}
                        className="hover:text-blue-600 transition-colors line-clamp-1"
                      >
                        {data.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {data.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={storageService.getFilePreview(imageId)}
                          alt="Author"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          {authInfo.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">5 min read</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* <!-- Load More Button --> */}
            <div className="text-center">
              <Link
                to="/all"
                onClick={() => window.scrollTo(0, 0)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                All Articles
              </Link>
            </div>
          </div>

          {/* <!-- Sidebar --> */}
          <aside className="lg:col-span-1">
            {/* <!-- Categories --> */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">
                Categories
              </h3>
              <ul className="space-y-2">
                {categoryId.map(([name, count], index) => (
                  <li key={index}>
                    <Link
                      to={`/nev/${name}`}
                      className="text-blue-900 hover:text-blue-600 flex justify-between items-center py-1 font-medium"
                    >
                      <span>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </span>
                      <span className="text-sm text-gray-400">{count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* <!-- Recent Posts --> */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Recent Posts
              </h3>

              <div className="space-y-4">
                {update.map((data) => (
                  <article key={data.$id} className="flex space-x-3">
                    <img
                      src={storageService.getFilePreview(data.featuredimage)}
                      alt="Post thumbnail"
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <Link to={"/show/" + data.$id}>
                        <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 leading-tight mb-1 line-clamp-1">
                          {data.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-gray-500">
                        {" "}
                        {new Date(data.$createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default MainContent;
