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
      <section class="bg-blue-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-4xl font-bold mb-6">
              {search} - Search Results
            </h1>
          </div>
        </div>
      </section>
      {/* <!-- Main Content --> */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid lg:grid-cols-4 gap-8">
          {/* <!-- Search Results --> */}
          <div class="lg:col-span-3">
            {/* <!-- Search Results --> */}
            <div class="space-y-8" id="search-results">
              {/* <!-- Search Result 1 --> */}
              {load.map((data) => (
                <article key={data.$id} class="blog-card">
                  <div class="md:flex">
                    <div class="md:w-1/3">
                      <img
                        src={storageService.getFilePreview(data.featuredimage)}
                        alt="AI Technology"
                        class="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div class="md:w-2/3 p-6">
                      <div class="flex items-center mb-3">
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase">
                          {data.category}
                        </span>
                        <span class="text-gray-500 text-sm ml-3">
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
                      <h2 class="text-2xl font-bold mb-3 text-blue-900">
                        <Link
                          to={"/home/show/" + data.$id}
                          class="hover:text-blue-600 transition-colors line-clamp-1"
                        >
                          {data.title}
                        </Link>
                      </h2>
                      <p class="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                        {data.content}
                      </p>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <img
                            src={storageService.getFilePreview(imageId)}
                            alt="Author"
                            class="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p class="text-sm font-medium text-gray-900">
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
              <div id="no-results" class="text-center py-12 hidden">
                <svg
                  class="mx-auto h-24 w-24 text-gray-400 mb-4"
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
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p class="text-gray-600">
                  Try adjusting your search terms or browse our categories.
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Sidebar --> * */}
          <aside class="lg:col-span-1">
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
                      to={`/home/nev/${name}`}
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
