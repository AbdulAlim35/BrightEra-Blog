import React, { useState, useEffect } from "react";
import databasesService from "../../app/databasesService";
import storageService from "../../app/storageService";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../contex/TheemProvider";

function SearchPage() {
  const [load, setLoad] = useState([]);
  const { authInfo, imageId, categoryId } = useTheme();
  const { search } = useParams();
  useEffect(() => {
    const featch = async () => {
      const sent = await databasesService.searchQuery(search);
      setLoad(sent.documents);
      console.log(sent);
    };
    featch();
  }, [search]);

  return (
    <>
      <section className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-4xl font-bold mb-6">
              {search} - Search Results
            </h1>
          </div>
        </div>
      </section>
      {/* <!-- Main Content --> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* <!-- Search Results --> */}
          <div className="lg:col-span-3">
            {/* <!-- Search Results --> */}
            <div className="space-y-8" id="search-results">
              {/* <!-- Search Result 1 --> */}
              {load.map((data) => (
                <article key={data.$id} className="blog-card">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={storageService.getFilePreview(data.featuredimage)}
                        alt="AI Technology"
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ">
                          {data.category?.charAt(0).toUpperCase() + data.category.slice(1)}
                        </span>
                        <span className="text-gray-500 text-sm ml-3">
                          {new Date(data?.$createdAt).toLocaleDateString(
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
                          to={"/show/" + data.$id}
                          className="hover:text-blue-600 transition-colors line-clamp-1"
                        >
                          {data.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                        {data.content}
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
                              {authInfo?.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
              {/* <!-- No Results Message (hidden by default) --> */}
              <div id="no-results" className="text-center py-12 hidden">
                <svg
                  className="mx-auto h-24 w-24 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse our categories.
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Sidebar --> * */}
          <aside className="lg:col-span-1">
            {/* <!-- Search Filters --> */}

            {/* <!-- Categories -->  */}
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
          </aside>
        </div>
      </main>
    </>
  );
}

export default SearchPage;
