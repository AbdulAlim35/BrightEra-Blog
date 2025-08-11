import React, { useState, useEffect } from "react";
import databasesService from "../../app/databasesService";
import { data, Link, useParams } from "react-router-dom";
import storageService from "../../app/storageService";
import { Query } from "appwrite";
import { set, useForm } from "react-hook-form";
import commentDatabas from "../../app/commentDatabas";
import { useTheme } from "../../contex/TheemProvider";

function BlogPage() {
  const { id } = useParams();
  const [update, setUpdate] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState([]);
  const { authInfo, imageId, categoryId } = useTheme();
  useEffect(() => {
    const featchData = async () => {
      const result = await databasesService.getPost(id);
      setPost(result);
    };
    if (id) {
      featchData();
    }
    recent();
     window.scrollTo(0, 0);
  }, [id]);
  const recent = async () => {
    const queries = [];
    queries.push(Query.orderDesc("$createdAt"), Query.limit(3));
    const main = await databasesService.listQuery(queries);
    setUpdate(main.documents);
  };

  const submit = async (data) => {
    if (!post) {
      return;
    }
    const load = await commentDatabas.commentPost({
      postId: post.$id,
      comment: data.content,
    });
    loadComment();
    reset();
  };
  const loadComment = async () => {
    if (!post) return;
    const sent = await commentDatabas.commentQuery(post.$id);
    setComment(sent.documents);
  };

  useEffect(() => {
    if (post) {
      loadComment();
    }
  }, [post]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* <!-- Article Content --> */}
        <article className="lg:col-span-3">
          {/* <!-- Article Title --> */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              {post?.title}
            </h1>

            <div className="flex items-center mb-6">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full uppercase">
                {post?.category}
              </span>
              <span className="text-gray-500 text-sm ml-4">
                {" "}
                {new Date(post?.$createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-gray-500 text-sm ml-4">•</span>
              <span className="text-gray-500 text-sm ml-2">15 min read</span>
            </div>
          </header>

          {/* <!-- Featured Image --> */}
          {post?.featuredimage && (
            <div className="mb-8">
              <img
                src={storageService.getFilePreview(post?.featuredimage)}
                alt="AI and Machine Learning Technology"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          )}
          {/* <!-- Article Content --> */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {post?.content}
            </p>
          </div>
        </article>
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
      {/* <!-- Comments Section --> */}
      <section className="mt-16 pt-16 border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">Comments</h2>

        {/* <!-- Comment Form --> */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">
            Leave a Comment
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit(submit)}>
            <textarea
              id="content"
              rows="4"
              placeholder="Your Comment"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("content", { required: true })}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Post Comment
            </button>
          </form>
        </div>

        {/* <!-- Sample Comments --> */}
        <div className="space-y-6">
          {comment.map((data) => (
            <div
              key={data.$id}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={storageService.getFilePreview(imageId)}
                  alt="Commenter"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-semibold text-blue-900 mr-3">
                      {authInfo.name}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(post?.$createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {data.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BlogPage;
