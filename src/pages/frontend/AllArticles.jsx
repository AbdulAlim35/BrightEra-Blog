import React, { useState, useEffect } from "react";
import databasesService from "../../app/databasesService";
import { useTheme } from "../../contex/TheemProvider";
import storageService from "../../app/storageService";
import { Link } from "react-router-dom";
import { Query } from "appwrite";

function AllArticles() {
  const [article, setArticle] = useState([]);
  const { authInfo, imageId } = useTheme();
  const [update, setUpdate] = useState([]);
  let { categoryId } = useTheme();
  console.log(categoryId);
  

  useEffect(() => {
    const feacth = async () => {
      const loaded = await databasesService.allarticles();

      setArticle(loaded.documents);
    };
    feacth();
    recent();
  }, []);
  const recent = async () => {
    const queries = [];
    queries.push(Query.orderDesc("$createdAt"), Query.limit(3));
    const main = await databasesService.listQuery(queries);
    setUpdate(main.documents);
  };

  return (
    <>
      {/* <!-- Category Header --> */}
      <section className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All Articles
            </h1>
          </div>
        </div>
      </section>
      {/* <!-- Main Content --> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* <!-- Blog Posts --> */}
          <div className="lg:col-span-3">
            <div className="grid gap-8">
              {/* <!-- Blog Post 1 --> */}
              {article.map((data) => (
                <article key={data.$id} className="blog-card transform transition duration-500 hover:scale-105">
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
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase">
                          {data.category}
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
                      <h2 class="text-2xl font-bold mb-3 text-blue-900">
                        <Link
                          to={"/home/show/" + data.$id}
                          class="hover:text-blue-600 transition-colors line-clamp-1"
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
                            <p className="text-sm text-gray-500">
                              {authInfo?.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* <!-- Sidebar --> */}
          <aside className="lg:col-span-1">
            {/* <!-- Newsletter Signup --> */}

            {/* <!-- Categories --> */}
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
                      <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                      <span className="text-sm text-gray-400">{count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* <!-- Recent Posts --> */}

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">
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
                      <Link to={"/home/show/" + data.$id}>
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

export default AllArticles;
